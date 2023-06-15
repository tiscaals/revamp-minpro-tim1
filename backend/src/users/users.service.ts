import * as fs from 'fs-extra';
import { Op, where } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateEmailDto, CreatePhoneNumberDto } from './dto/create-user.dto';
import {
  UpdateEmailDto,
  UpdatePasswordDto,
  UpdatePhoneNumberDto,
  UpdateUserDto,
} from './dto/update-user.dto';
import { Sequelize } from 'sequelize-typescript';
import {
  phone_number_type,
  roles,
  users,
  users_email,
  users_phones,
  users_roles,
} from 'models';

//Untuk Format Date User_Modified
const { DateTime } = require('luxon');
const currentTimeUTC = DateTime.utc();
const currentTimeID = currentTimeUTC.setZone('Asia/Jakarta');

@Injectable()
export class UsersService {
  constructor(private sequelize: Sequelize) {}

  //Service Get User
  async getUsers(): Promise<any> {
    try {
      const result = await users.findAll({
        attributes: [
          'user_entity_id',
          'user_name',
          'user_first_name',
          'user_last_name',
          'user_birth_date',
          'user_password',
          'user_photo',
          'user_current_role',
        ],
        include: [
          {
            model: users_email,
            attributes: ['pmail_address'],
          },
          {
            model: users_roles,
            attributes: ['usro_role_id'],
            include: [
              {
                model: roles,
                attributes: ['role_name'],
              },
            ],
          },
          {
            model: users_phones,
            attributes: ['uspo_number'],
          },
        ],
      });

      const succes = {
        message: 'success',
        status: 200,
        result: result,
      };

      return succes;
    } catch (error) {
      return error.message;
    }
  }

  async getUsersById(id: number): Promise<any> {
    try {
      const result = await users.findOne({
        attributes: [
          'user_entity_id',
          'user_name',
          'user_first_name',
          'user_last_name',
          'user_birth_date',
          'user_password',
          'user_photo',
          'user_current_role',
        ],
        include: [
          {
            model: users_email,
            attributes: ['pmail_id', 'pmail_address'],
          },
          {
            model: users_roles,
            attributes: ['usro_role_id'],
            include: [
              {
                model: roles,
                attributes: ['role_name'],
              },
            ],
          },
          {
            model: users_phones,
            attributes: ['uspo_number', 'uspo_ponty_code'],
            include: [
              {
                model: phone_number_type,
                attributes: ['ponty_code'],
              },
            ],
          },
        ],
        where: { user_entity_id: id },
      });

      const succes = {
        message: 'success',
        status: 200,
        result: result,
      };

      return succes;
    } catch (error) {
      return error.message;
    }
  }

  //Service Update Profile
  async updateProfile(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const checkUsername = await users.findAll({
        where: {
          user_name: updateUserDto.user_name,
          user_entity_id: { [Op.not]: id },
        },
      });

      if (checkUsername.length > 0) {
        throw new Error('username already exists. please try again.');
      }

      if (!updateUserDto.user_name) {
        throw new Error('username required');
      }

      const getPk = await users.findByPk(id);

      const oldImagePath = './public/user-image/' + getPk.user_photo;

      let updatedFields: Partial<UpdateUserDto> = {
        user_name: updateUserDto.user_name,
        user_first_name: updateUserDto.user_first_name,
        user_last_name: updateUserDto.user_last_name,
        user_birth_date: updateUserDto.user_birth_date,
        user_modified_date: currentTimeID,
      };

      // cek apakah ada gambar yang diupload
      if (updateUserDto.user_photo) {
        updatedFields.user_photo = updateUserDto.user_photo;
      }

      const result = await users.update(updatedFields, {
        where: { user_entity_id: id },
        returning: true,
      });

      if (updateUserDto.user_photo && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      const success = {
        message: 'update profile success',
        status: 200,
        result: result[1],
      };

      return success;
    } catch (error) {
      // const oldImagePath = './public/user-image/' + updateUserDto.user_photo;
      // if (fs.existsSync(oldImagePath)) {
      //   fs.unlinkSync(oldImagePath);
      // }
      const errorMsg = {
        status: 400,
        message: error.message,
      };
      return errorMsg;
    }
  }

  //Service Profile Edit Password
  async updatePassword(
    id: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<any> {
    try {
      const dataUser = await users.findByPk(id);

      const currentPassword = updatePasswordDto.current_password;
      const newPassword = updatePasswordDto.new_password;

      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        dataUser.user_password,
      );
      if (!isPasswordMatch) {
        throw new Error('invalid current password. please try again.');
      }

      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(newPassword, salt);

      await users.update(
        { user_password: newHashedPassword, user_modified_date: currentTimeID },
        { where: { user_entity_id: id } },
      );

      const succes = {
        message: 'password updated successfully',
        status: 200,
      };
      return succes;
    } catch (error) {
      const errorMsg = {
        message: error.message,
        status: 400,
      };

      return errorMsg;
    }
  }

  //Service Profile Email
  async addEmailProfile(createEmailDto: CreateEmailDto): Promise<any> {
    try {
      const emailCount = await users_email.count({
        where: {
          pmail_entity_id: createEmailDto.pmail_entity_id,
        },
      });

      if (emailCount >= 2) {
        throw new Error('user only have maximum 2 email');
      }

      const existingEmail = await users_email.findOne({
        where: {
          pmail_address: createEmailDto.pmail_address,
        },
      });

      if (existingEmail) {
        throw new Error('email already exists, try again');
      }

      const result = await users_email.create({
        pmail_entity_id: createEmailDto.pmail_entity_id,
        pmail_address: createEmailDto.pmail_address,
      });

      const success = {
        message: 'add email successfully',
        status: 200,
        result: result,
      };

      return success;
    } catch (error) {
      const errorMsg = {
        message: error.message,
        status: 400,
      };
      return errorMsg;
    }
  }

  async updateEmailProfile(
    id: number,
    updateEmailDto: UpdateEmailDto,
  ): Promise<any> {
    try {
      const existingEmail = await users_email.findAll({
        where: {
          pmail_address: updateEmailDto.pmail_address,
          pmail_id: { [Op.not]: id },
        },
      });

      if (existingEmail.length > 0) {
        throw new Error('email already exists. please try again.');
      }
      const result = await users_email.update(
        {
          pmail_address: updateEmailDto.pmail_address,
          pmail_modified_date: currentTimeID,
        },
        { where: { pmail_id: id }, returning: true },
      );

      const succes = {
        message: 'update email successfully',
        status: 200,
        result: result,
      };

      return succes;
    } catch (error) {
      const errorMsg = {
        message: error.message,
        status: 400,
      };

      return errorMsg;
    }
  }

  async removeEmailProfile(id: number): Promise<any> {
    try {
      await users_email.destroy({
        where: { pmail_id: id },
      });

      const succes = {
        message: 'delete email successfully',
        status: 200,
      };
      return succes;
    } catch (error) {
      return error.message;
    }
  }

  // Service Profile Phone Number
  async addNumberPhone(
    createPhoneNumberDto: CreatePhoneNumberDto,
  ): Promise<any> {
    try {
      const phoneNumberCount = await users_phones.count({
        where: {
          uspo_entity_id: createPhoneNumberDto.uspo_entity_id,
        },
      });

      if (phoneNumberCount >= 2) {
        throw new Error('user only have maximum 2 number phone');
      }

      const existingPhoneNumber = await users_phones.findOne({
        where: {
          uspo_number: createPhoneNumberDto.number_phone,
        },
      });

      if (existingPhoneNumber) {
        throw new Error('number phone already exists, try again');
      }

      const result = await users_phones.create({
        uspo_entity_id: createPhoneNumberDto.uspo_entity_id,
        uspo_number: createPhoneNumberDto.number_phone,
        uspo_ponty_code: createPhoneNumberDto.uspo_ponty_code,
      });

      const success = {
        message: 'add new number phone successfully',
        status: 200,
        result: result,
      };

      return success;
    } catch (error) {
      const errorMsg = {
        message: error.message,
        status: 400,
      };
      return errorMsg;
    }
  }

  async updateNumberPhone(
    phone_number: any,
    updatePhoneNumberDto: UpdatePhoneNumberDto,
  ): Promise<any> {
    try {
      const existingPhoneNumber = await users_phones.findOne({
        where: {
          uspo_number: updatePhoneNumberDto.number_phone,
        },
      });

      if (
        existingPhoneNumber &&
        existingPhoneNumber.uspo_number !== phone_number
      ) {
        throw new Error('number phone already exists, try again');
      }

      const result = await users_phones.update(
        {
          uspo_number: updatePhoneNumberDto.number_phone,
          uspo_ponty_code: updatePhoneNumberDto.uspo_ponty_code,
          uspo_modified_date: currentTimeID,
        },
        { where: { uspo_number: phone_number }, returning: true },
      );

      const success = {
        message: 'number phone update successfully',
        status: 200,
        result: result,
      };

      return success;
    } catch (error) {
      const errorMsg = {
        message: error.message,
        status: 400,
      };

      return errorMsg;
    }
  }

  async removeNumberPhone(phone_number: any): Promise<any> {
    try {
      await users_phones.destroy({
        where: { uspo_number: phone_number },
      });

      const succes = {
        message: 'delete phone number successfully',
        status: 200,
      };

      return succes;
    } catch (error) {
      return error.message;
    }
  }
}
