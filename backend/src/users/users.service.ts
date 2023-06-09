import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Sequelize } from 'sequelize-typescript';
import { roles, users, users_email, users_roles } from 'models';

@Injectable()
export class UsersService {
  constructor(private sequelize: Sequelize) {}

  async getUsers() {
    try {
      const result = await users.findAll({
        attributes: [
          'user_entity_id',
          'user_name',
          'user_password',
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

  async getUsersById(id: number) {
    try {
      const result = await users.findOne({
        attributes: [
          'user_entity_id',
          'user_name',
          'user_password',
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

  create(createUserDto: CreateUsersDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
