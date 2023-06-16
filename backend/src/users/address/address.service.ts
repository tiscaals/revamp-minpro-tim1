import { Injectable } from '@nestjs/common';
import { address } from 'models/master';
import { users_address } from 'models/users';
import { Sequelize } from 'sequelize-typescript';
import { CreateAddressDto } from '../dto/create-user.dto';
import { UpdateAddressDto } from '../dto/update-user.dto';

@Injectable()
export class AddressServices {
  constructor(private sequelize: Sequelize) {}

  async getCity(): Promise<any> {
    try {
      const result = await this.sequelize.query(
        'SELECT city.city_id, city.city_name FROM master.city',
      );
      const succes = {
        result: result[0],
        status: 200,
        message: 'success',
      };
      return succes;
    } catch (error) {
      return error.message;
    }
  }

  async getAddressType(): Promise<any> {
    try {
      const result = await this.sequelize.query(
        'SELECT address_type.adty_id, address_type.adty_name FROM master.address_type',
      );
      const succes = {
        result: result[0],
        status: 200,
        message: 'success',
      };
      return succes;
    } catch (error) {
      return error.message;
    }
  }

  //Service Profile Address
  async addAddress(createAddresDto: CreateAddressDto): Promise<any> {
    try {
      const query = `CALL users.add_address(:first_address, :second_address, :code_pos, :city_id, :user_id, :address_type_id)`;
      const result = await this.sequelize.query(query, {
        replacements: {
          first_address: createAddresDto.first_address,
          second_address: createAddresDto.second_address,
          code_pos: createAddresDto.code_pos,
          city_id: createAddresDto.city_id,
          user_id: createAddresDto.user_id,
          address_type_id: createAddresDto.address_type_id,
        },
      });

      const success = {
        message: 'add address successfully',
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

  async updateAddress(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<any> {
    try {
      const query = `CALL users.update_address(:address_id, :first_address, :second_address, :code_pos, :city_id, :address_type_id)`;
      const result = await this.sequelize.query(query, {
        replacements: {
          address_id: id,
          first_address: updateAddressDto.first_address,
          second_address: updateAddressDto.second_address,
          code_pos: updateAddressDto.code_pos,
          city_id: updateAddressDto.city_id,
          address_type_id: updateAddressDto.address_type_id,
        },
      });

      const success = {
        message: 'update address successfully',
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

  async removeAddress(id: number): Promise<any> {
    try {
      await address.destroy({
        where: { addr_id: id },
      });

      await users_address.destroy({
        where: { etad_addr_id: id },
      });

      return { message: 'delete address successfully', status: 200 };
    } catch (error) {
      return error.message;
    }
  }
}
