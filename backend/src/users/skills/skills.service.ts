import { Op, where } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateSkillsDto } from '../dto/create-user.dto';
import { users_skill } from 'models/users';

@Injectable()
export class SkillsService {
  constructor(private sequelize: Sequelize) {}

  //Service Profile Skill
  async getSkill(): Promise<any> {
    try {
      const query = `SELECT * FROM master.skill_type`;
      const result = await this.sequelize.query(query);

      return { message: 'success', status: 200, result: result[0] };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  }

  async addSkills(createSkillsDto: CreateSkillsDto): Promise<any> {
    try {
      const checkIsExist = await users_skill.findAll({
        where: {
          uski_entity_id: createSkillsDto.uski_entity_id,
          uski_skty_name: createSkillsDto.uski_skty_name,
        },
      });

      if (checkIsExist.length > 0) {
        return {
          message: 'skills already exists, try again  ',
          status: 400,
        };
      }

      const result = await users_skill.create({
        uski_entity_id: createSkillsDto.uski_entity_id,
        uski_skty_name: createSkillsDto.uski_skty_name,
      });

      return {
        message: 'add skill successfully',
        status: 200,
        result: result,
      };
    } catch (error) {
      return {
        message: error.message,
        status: 400,
      };
    }
  }

  async removeSkill(id: number): Promise<any> {
    try {
      await users_skill.destroy({
        where: { uski_id: id },
      });
      return { message: 'delete skill successfully', status: 200 };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  }
}
