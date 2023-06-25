import { Injectable } from '@nestjs/common';
import { CreateAddressTypeDto } from './dto/create-address_type.dto';
import { UpdateAddressTypeDto } from './dto/update-address_type.dto';
import { address_type } from 'models/master';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AddressTypeService {
  constructor(
    private sequelize : Sequelize
  ){}
  async create(createAddressTypeDto: CreateAddressTypeDto) {
    try {
      const result = await address_type.create(createAddressTypeDto);
      console.log(createAddressTypeDto)
      return result
    } catch (error) {
      return error.message
    }
  }

  async findAll() {
    try {
      const result = await address_type.findAll();
      return result;
    } catch (error) {
      return error.message
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} addressType`;
  // }

  async update(adty_id: number, updateAddressTypeDto: UpdateAddressTypeDto) {
    try {
      const result = await address_type.update(
        updateAddressTypeDto,
        {
          where: {
            adty_id: adty_id
          },
          returning: true
        }
      );
      return result;
    } catch (error) {
      return error.message;
    }
  }
  

 async remove(adty_id: number) {
    try {
      const result = await address_type.destroy({where: { adty_id: adty_id }});
    } catch (error) {
      return error.message
    };
  }
}
