import { Injectable } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { province } from 'models/master';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ProvincesService {
  constructor(
    private sequelize: Sequelize){}
 async create(createProvinceDto: CreateProvinceDto) {
    try {
      const result = await province.create(createProvinceDto)
      return result    
    } catch (error) {
      return error.message
    }
  }

  async findAll() {
    try {
      const result =await this.sequelize.query(`select * from master.getProvinces`)
      return result    
    } catch (error) {
      return error.message
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} province`;
  }

  async update(id: number, updateProvinceDto: UpdateProvinceDto) {
    try {
      const result = await province.update(updateProvinceDto, { where: { prov_id: id } });
      return result
    } catch (error) {
      return error.message;
    }
  }
  

  async remove(prov_id : any) {
    try {
      const result = await province.destroy({ where: { prov_id: prov_id } });
      return result;
    } catch (error) {
      return error.message
    }
  }
}
