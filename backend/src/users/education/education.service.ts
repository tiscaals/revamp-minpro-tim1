import { Injectable } from '@nestjs/common';
import { users_education } from 'models/users';
import { Sequelize } from 'sequelize-typescript';
import { CreateEducationDto } from '../dto/create-user.dto';
import { UpdateEducationDto } from '../dto/update-user.dto';

//Untuk Format Date User_Modified
const { DateTime } = require('luxon');
const currentTimeUTC = DateTime.utc();
const currentTimeID = currentTimeUTC.setZone('Asia/Jakarta');

@Injectable()
export class EducationServices {
  constructor(private sequelize: Sequelize) {}

  async addEducation(createEducationDto: CreateEducationDto): Promise<any> {
    try {
      const educationCount = await users_education.count({
        where: {
          usdu_entity_id: createEducationDto.usdu_entity_id,
        },
      });

      if (educationCount >= 1) {
        throw new Error('education has been filled in');
      }

      const result = await users_education.create({
        usdu_entity_id: createEducationDto.usdu_entity_id,
        usdu_school: createEducationDto.usdu_school,
        usdu_degree: createEducationDto.usdu_degree,
        usdu_field_study: createEducationDto.usdu_field_study,
        usdu_start_date: createEducationDto.usdu_start_date,
        usdu_end_date: createEducationDto.usdu_end_date,
        usdu_grade: createEducationDto.usdu_grade,
        usdu_activities: createEducationDto.usdu_activities,
        usdu_description: createEducationDto.usdu_description,
      });

      return {
        message: 'add education successfully',
        status: 200,
        result: result
      };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  }

  async updateEducation(
    id: number,
    updateEducationDto: UpdateEducationDto,
  ): Promise<any> {
    try {
      const result = await users_education.update(
        {
          usdu_school: updateEducationDto.usdu_school,
          usdu_degree: updateEducationDto.usdu_degree,
          usdu_field_study: updateEducationDto.usdu_field_study,
          usdu_start_date: updateEducationDto.usdu_start_date,
          usdu_end_date: updateEducationDto.usdu_end_date,
          usdu_grade: updateEducationDto.usdu_grade,
          usdu_activities: updateEducationDto.usdu_activities,
          usdu_description: updateEducationDto.usdu_description,
          usdu_modified_data: currentTimeID,
        },
        { where: { usdu_id: id }, returning: true }
      );

      return {
        messagge: 'update education successfully',
        status: 200,
        result: result,
      };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  }

  async removeEducation(id: number): Promise<any> {
    try {
      await users_education.destroy({
        where: { usdu_id: id },
      });

      return {
        message: 'delete education information successfuly',
        status: 200,
      };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  }
}
