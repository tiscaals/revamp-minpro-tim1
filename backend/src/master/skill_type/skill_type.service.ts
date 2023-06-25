import { Injectable } from '@nestjs/common';
import { CreateSkillTypeDto } from './dto/create-skill_type.dto';
import { UpdateSkillTypeDto } from './dto/update-skill_type.dto';
import { skill_type } from 'models/master';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class SkillTypeService {

  constructor(
    private sequelize: Sequelize){}
async  create(createSkillTypeDto: CreateSkillTypeDto) {
    try {
      const result = await skill_type.create(createSkillTypeDto);
      return result
    } catch (error) {
      return error.message
    }
  }

  async findAll() {
    try{
    const result = await skill_type.findAll();
    return result;
    }catch(e){
      return e.message
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} skillType`;
  }

   
  async update(skty_name: string, updateSkillTypeDto: UpdateSkillTypeDto) {
    try {
      const result = await this.sequelize.query(
        `UPDATE master.skill_type SET skty_name = :skty_name WHERE skty_name = :old_skty_name`,
        {
          replacements: {
            skty_name: updateSkillTypeDto.skty_name_new,
            old_skty_name: skty_name
          }
        }
      );
      return result;
    } catch (error) {
      return error.message;
    }
  }
  
  
  
  
  


  async remove(skty_name: string) {
    try {
      const result = await skill_type.destroy({
        where: { skty_name: skty_name }
      });
      console.log(`${result} row(s) deleted.`);
    } catch (error) {
      console.error('Error occurred while removing skill type:', error);
    }
  }
  
}
