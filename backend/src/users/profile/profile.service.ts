import * as fs from 'fs-extra';
import { Op, where } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { users } from 'models/users';
import { UpdateUserDto } from '../dto/update-user.dto';

//Untuk Format Date User_Modified
const { DateTime } = require('luxon');
const currentTimeUTC = DateTime.utc();
const currentTimeID = currentTimeUTC.setZone('Asia/Jakarta');

@Injectable()
export class ProfileService {
  constructor(private sequelize: Sequelize) {}

  //Service Update Profile
  async updateProfile(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const birthDate = updateUserDto.user_birth_date || null;

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
        user_birth_date: birthDate,
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

      return {
        message: 'update profile success',
        status: 200,
        result: result[1],
      };
    } catch (error) {
      // const oldImagePath = './public/user-image/' + updateUserDto.user_photo;
      // if (fs.existsSync(oldImagePath)) {
      //   fs.unlinkSync(oldImagePath);
      // }
      return {
        status: 400,
        message: error.message,
      };
    }
  }
}
