import { Op, where } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { users_email } from 'models/users';
import { CreateEmailDto } from '../dto/create-user.dto';
import { UpdateEmailDto } from '../dto/update-user.dto';

//Untuk Format Date User_Modified
const { DateTime } = require('luxon');
const currentTimeUTC = DateTime.utc();
const currentTimeID = currentTimeUTC.setZone('Asia/Jakarta');

@Injectable()
export class EmailService {
  constructor(private sequelize: Sequelize) {}

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

      return {
        message: 'add email successfully',
        status: 200,
        result: result,
      };
    } catch (error) {
      return {
        message: error.message,
        status: 400,
      };
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

      return {
        message: 'update email successfully',
        status: 200,
        result: result,
      };

    } catch (error) {
      return {
        message: error.message,
        status: 400,
      };
    }
  }

  async removeEmailProfile(id: number): Promise<any> {
    try {
      await users_email.destroy({
        where: { pmail_id: id },
      });

      return {
        message: 'delete email successfully',
        status: 200,
      };
    } catch (error) {
      return error.message;
    }
  }
}
