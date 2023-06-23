import { Injectable } from '@nestjs/common';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class MasterService {
  constructor(private sequelize: Sequelize){}
  create(createMasterDto: CreateMasterDto) {
    return 'This action adds a new master';
  }

  async findAll() {
    try {
      const query = `SELECT * FROM master.category`
      const result = await this.sequelize.query(query)
      return result
    } catch (error) {
      return error.message 
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} master`;
  }

  update(id: number, updateMasterDto: UpdateMasterDto) {
    return `This action updates a #${id} master`;
  }

  remove(id: number) {
    return `This action removes a #${id} master`;
  }
}
