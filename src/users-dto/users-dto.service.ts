import { Injectable } from '@nestjs/common';
import { CreateUsersDtoDto } from './dto/create-users-dto.dto';
import { UpdateUsersDtoDto } from './dto/update-users-dto.dto';
import { users } from 'models_users';
import { Sequelize } from 'sequelize-typescript';


@Injectable()
export class UsersDtoService {
  constructor(private sequelize: Sequelize) {}
  async create(createUsersDtoDto: CreateUsersDtoDto) {
    try {
      const datas = [{
        user_name: createUsersDtoDto.user_name,
        user_first_name: createUsersDtoDto.user_first_name,
        user_last_name: createUsersDtoDto.user_last_name,
        user_birth_date: createUsersDtoDto.user_birth_date,
        user_demographic: createUsersDtoDto.user_demographic,
        user_photo: createUsersDtoDto.user_photo
      }]

    } catch (error) {
      return error.message
    }
  }

  async findAll(search:any) {
    try {
      let result = `SELECT * FROM users.users`
      if(search){
        result += ` WHERE user_first_name ILIKE '%${search}' OR user_last_name ILIKE '%${search}'`
      }
      const query = await this.sequelize.query(result)
      return query
    } catch (error) {
      return error.message
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} usersDto`;
  }

  update(id: number, updateUsersDtoDto: UpdateUsersDtoDto) {
    try {


      const datas = [{
        user_name: updateUsersDtoDto.user_name,
        user_first_name: updateUsersDtoDto.user_first_name,
        user_last_name: updateUsersDtoDto.user_last_name,
        user_birth_date: updateUsersDtoDto.user_birth_date,
        user_demographic: updateUsersDtoDto.user_demographic,
        user_photo: updateUsersDtoDto.user_photo
      }]
    } catch (error) {
      
    }
  }

  remove(id: number) {
    return `This action removes a #${id} usersDto`;
  }
}
