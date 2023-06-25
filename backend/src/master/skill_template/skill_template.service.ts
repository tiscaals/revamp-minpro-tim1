import { Injectable } from '@nestjs/common';
import { CreateSkillTemplateDto } from './dto/create-skill_template.dto';
import { UpdateSkillTemplateDto } from './dto/update-skill_template.dto';
import { skill_template } from 'models/master';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class SkillTemplateService {
  constructor(
    private sequelize:Sequelize
  ){}
  async create(createSkillTemplateDto: CreateSkillTemplateDto) {
    try {
      const result = await skill_template.create(createSkillTemplateDto)
      return result
    } catch (error) {
      return error.message
    }
  }

  async findAll() {
   try {
     const result = await this.sequelize.query(`select * from master.skillTemplate`);
     return result;
   } catch (error) {
    return error.message
   }
  }

  findOne(id: number) {
    return `This action returns a #${id} skillTemplate`;
  }

  async update(id: number, updateSkillTemplateDto: UpdateSkillTemplateDto) {
    try {
      const result = await skill_template.update(updateSkillTemplateDto,{where:{skte_id : id}})
    } catch (error) {
      return error.message
    }
  }

  async remove(id: number) {
    try {
      const result = await skill_template.destroy({where:{skte_id:id}})
      return result;
    } catch (error) {
      return error.message
    }
  }
}
