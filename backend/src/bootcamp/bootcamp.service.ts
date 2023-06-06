import { Injectable } from '@nestjs/common';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class BootcampService {
  constructor(private sequelize: Sequelize){}

  create(createBootcampDto: CreateBootcampDto) {
    return 'This action adds a new bootcamp';
  }

  async findAll() {
    try {
      const data = await this.sequelize.query('select * from bootcamp.batch')
      return {
        message: 'sukses',
        data: data[0]
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} bootcamp`;
  }

  update(id: number, updateBootcampDto: UpdateBootcampDto) {
    return `This action updates a #${id} bootcamp`;
  }

  remove(id: number) {
    return `This action removes a #${id} bootcamp`;
  }
}
