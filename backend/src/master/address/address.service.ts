import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { address } from 'models/master';
import e from 'express';

@Injectable()
export class AddressService {
 async create(createAddressDto: CreateAddressDto) {
    try {
      const result = await address.create(createAddressDto)
      return result
    } catch (error) {
      return error.message
    }
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
