import { Injectable } from '@nestjs/common';
import { users_phones } from 'models/users';
import { Sequelize } from 'sequelize-typescript';
import { CreatePhoneNumberDto } from '../dto/create-user.dto';
import { UpdatePhoneNumberDto } from '../dto/update-user.dto';
//Untuk Format Date User_Modified
const { DateTime } = require('luxon');
const currentTimeUTC = DateTime.utc();
const currentTimeID = currentTimeUTC.setZone('Asia/Jakarta');

@Injectable()
export class PhoneService {
  constructor(private sequelize: Sequelize) {}

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
