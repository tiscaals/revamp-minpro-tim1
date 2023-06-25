import { Injectable } from '@nestjs/common';
import { CreateHrDtoDto } from './dto/create-hr-dto.dto';
import { UpdateHrDtoDto } from './dto/update-hr-dto.dto';
import { Sequelize } from 'sequelize-typescript';
import { users } from 'models_users';
import * as fs from 'fs';

@Injectable()
export class HrDtoService {
  constructor(private sequelize: Sequelize) {}

  async editProfile(id: number, updateProfileDto: any, file?: Express.Multer.File) {
    try {
      const user = await users.findByPk(+id)
      console.log("finbypk", user);

      let setImage = user.user_photo

      const data = './user_photo' + user.user_photo;
      if (user.user_photo && user.user_photo) {
        if (fs.existsSync(data)) {
          fs.unlinkSync(data);
        }
        user.user_photo = file.filename;
      } else {
        throw new Error(`id ${id} Not Found!`);
      }
      // if (file) {
      //   if (setImage !== null) {
      //     fs.unlinkSync('./user_photo' + user.user_photo);
      //   }
      //   setImage = file.filename;
      // }

      const res = await users.update(
        {
          user_name: updateProfileDto.user_name,
          user_first_name: updateProfileDto.user_first_name,
          user_last_name: updateProfileDto.user_last_name,
          user_birth_date: updateProfileDto.user_birth_date,
          user_photo: setImage || updateProfileDto.user_photo,
        },
        {
          where: {
            user_entity_id: id,
          },
          returning: true
        }
      );
      console.log("cek",res);
      return {
        data: res,
        status: 200,
        message: "sukses"
      }
    } catch (error) {
      if (file && updateProfileDto.user_photo) {
        fs.unlinkSync('./user_photo' + file.filename);
      }
      return error.message
    }
  }

  async findAll() {
    try {
      const result = await this.sequelize.query(`SELECT employee.emp_entity_id,
                        users.user_name,
                        users.user_photo
                        FROM hr.employee
                        JOIN users.users ON users.user_entity_id = employee.emp_entity_id`);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} hrDto`;
  }

  update(id: number, updateHrDtoDto: UpdateHrDtoDto) {
    return `This action updates a #${id} hrDto`;
  }

  remove(id: number) {
    return `This action removes a #${id} hrDto`;
  }
}
