import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { modules } from 'models/master';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ModulesService {
  constructor(
    private readonly sequelize : Sequelize
  ) {
    
  }
 async create(createModuleDto: CreateModuleDto) {
    try {
      const result = await modules.create(createModuleDto)
      return result
    } catch (error) {
      return error.message
    }
  }

  async findAll() {
    try {
      const result = await modules.findAll();
      return result
    } catch (error) {
      return error.message
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  async update(old_module_name: string , updateModuleDto : UpdateModuleDto) {
    try {
      const result = await this.sequelize.query(`UPDATE master.modules SET module_name = '${updateModuleDto.module_name}' WHERE module_name = '${old_module_name}'`)
      return result
    } catch (error) {
      return error.message
    }
  }

  async remove(module_name: string) {
    try {
      const result = await modules.destroy({ where: { module_name: module_name } });
      return result;
    } catch (error) {
      return error.message;
    }
  }
}  
