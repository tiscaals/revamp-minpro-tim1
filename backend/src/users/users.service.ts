import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdatePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { Sequelize } from 'sequelize-typescript';
import { roles, users, users_email, users_phones, users_roles } from 'models';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import * as fs from 'fs-extra';

//Untuk Format Date User_Modified
const { DateTime } = require('luxon');
const currentTimeUTC = DateTime.utc();
const currentTimeID = currentTimeUTC.setZone('Asia/Jakarta');

@Injectable()
export class UsersService {
  constructor(private sequelize: Sequelize) {}

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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
