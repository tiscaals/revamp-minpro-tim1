import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { Sequelize } from 'sequelize-typescript';
import {
  phone_number_type,
  roles,
  users,
  users_address,
  users_education,
  users_email,
  users_experiences,
  users_phones,
  users_roles,
  users_skill,
} from 'models/users';
import { address, address_type, city } from 'models/master';

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

      return {
        message: 'success',
        status: 200,
        result: result,
      };
    } catch (error) {
      return { message: error.message, status: 400 };
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
          {
            model: users_address,
            include: [
              {
                model: address,
                attributes: [
                  'addr_id',
                  'addr_line1',
                  'addr_line2',
                  'addr_postal_code',
                ],
                include: [
                  {
                    model: city,
                    attributes: ['city_name'],
                  },
                ],
              },
              {
                model: address_type,
                attributes: ['adty_id', 'adty_name'],
              },
            ],
          },
          {
            model: users_education,
          },
          {
            model: users_experiences,
            include: [
              {
                model: city,
              },
            ],
          },
          {
            model: users_skill,
          },
        ],
        where: { user_entity_id: id },
      });

      return {
        message: 'success',
        status: 200,
        result: result,
      };
    } catch (error) {
      return { message: error.message, status: 400 };
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

      return {
        message: 'password updated successfully',
        status: 200,
      };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  }
}
