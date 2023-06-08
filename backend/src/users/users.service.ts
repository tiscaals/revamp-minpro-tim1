import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(private sequelize: Sequelize) {}

  async getUsers() {
    try {
      const result = await this.sequelize.query(
        `SELECT * from users.selectUsers`,
      );

      const succes = {
        message: 'success',
        status: 200,
        result: result[0],
      };

      return succes;
    } catch (error) {
      return error.message;
    }
  }

  async getUsersById(id: number) {
    try {
      const result = await this.sequelize.query(
        `SELECT * from users.selectUsers WHERE user_entity_id = ${id}`,
      );

      const succes = {
        message: 'success',
        status: 200,
        result: result[0],
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
