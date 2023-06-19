import { Injectable } from '@nestjs/common';
import { users_experiences } from 'models/users';
import { Sequelize } from 'sequelize-typescript';
import { CreateExperiencesDto } from '../dto/create-user.dto';
import { UpdateExperiencesDto } from '../dto/update-user.dto';

//Untuk Format Date User_Modified
const { DateTime } = require('luxon');
const currentTimeUTC = DateTime.utc();
const currentTimeID = currentTimeUTC.setZone('Asia/Jakarta');

@Injectable()
export class ExperiencesService {
  constructor(private sequelize: Sequelize) {}

  async addExperiences(
    createExperiencesDto: CreateExperiencesDto,
  ): Promise<any> {
    try {
      const checkCount = await users_experiences.count({
        where: { usex_entity_id: createExperiencesDto.usex_entity_id },
      });

      if (checkCount >= 1) {
        throw new Error('experiences has been filled in');
      }

      const endDate = createExperiencesDto.usex_end_date || null;
      const result = await users_experiences.create({
        usex_entity_id: createExperiencesDto.usex_city_id,
        usex_title: createExperiencesDto.usex_title,
        usex_profile_headline: createExperiencesDto.usex_profile_headline,
        usex_employment_type: createExperiencesDto.usex_employment_type,
        usex_company_name: createExperiencesDto.usex_company_name,
        usex_is_current: createExperiencesDto.usex_is_current,
        usex_start_date: createExperiencesDto.usex_start_date,
        usex_end_date: endDate,
        usex_industry: createExperiencesDto.usex_industry,
        usex_description: createExperiencesDto.usex_description,
        usex_experience_type: createExperiencesDto.usex_experience_type,
        usex_city_id: createExperiencesDto.usex_city_id,
      });

      return {
        status: 200,
        message: 'add experiences successfully',
        result: result,
      };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  }

  async updateExperiences(
    id: number,
    updateExperiencesDto: UpdateExperiencesDto,
  ): Promise<any> {
    try {
      const endDate = updateExperiencesDto.usex_end_date || null;
      const result = await users_experiences.update(
        {
          usex_title: updateExperiencesDto.usex_title,
          usex_profile_headline: updateExperiencesDto.usex_profile_headline,
          usex_employment_type: updateExperiencesDto.usex_employment_type,
          usex_company_name: updateExperiencesDto.usex_company_name,
          usex_is_current: updateExperiencesDto.usex_is_current,
          usex_start_date: updateExperiencesDto.usex_start_date,
          usex_end_date: endDate,
          usex_industry: updateExperiencesDto.usex_industry,
          usex_description: updateExperiencesDto.usex_description,
          usex_experience_type: updateExperiencesDto.usex_experience_type,
          usex_city_id: updateExperiencesDto.usex_city_id,
        },
        { where: { usex_id: id }, returning: true },
      );

      return {
        status: 200,
        message: 'update experiences successfully',
        result: result,
      };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  }

  async removeExperiences(id: number): Promise<any> {
    try {
      await users_experiences.destroy({
        where: { usex_id: id },
      });
      return { message: 'delete experiences successfully', status: 200 };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  }
}
