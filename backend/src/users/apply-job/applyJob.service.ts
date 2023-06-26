import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UpdateApplyJobsDto } from '../dto/update-user.dto';
import { users } from 'models/users/users';
import * as fs from 'fs-extra';

const port = process.env.PORT ;
@Injectable()
export class ApplyJobService {
  constructor(private sequelize: Sequelize) {}

  async applyJobs(id: any, updateApplyJobsDto: any): Promise<any> {
    try {
      const query = `CALL users.apply_jobs(:user_id, :firstname, :lastname, :userphoto, :birthdate, :user_school, :user_degree, :user_field_study, :user_phone_number, :user_resume, :user_filelink, :user_filesize, :user_filetype, :role_id )`;
      const result = await this.sequelize.query(query, {
        replacements: {
          user_id: id,
          firstname: updateApplyJobsDto.firstname,
          lastname: updateApplyJobsDto.lastname,
          userphoto: updateApplyJobsDto.userphoto,
          birthdate: updateApplyJobsDto.birthdate,
          user_school: updateApplyJobsDto.user_school,
          user_degree: updateApplyJobsDto.user_degree,
          user_field_study: updateApplyJobsDto.user_field_study,
          user_phone_number: updateApplyJobsDto.user_phone_number,
          user_resume: updateApplyJobsDto.user_resume,
          user_filelink: `http://localhost:${port}/files/user-media/${updateApplyJobsDto.user_resume}`,
          user_filesize: updateApplyJobsDto.user_filesize,
          user_filetype: updateApplyJobsDto.user_filetype,
          role_id: updateApplyJobsDto.role_id,
        },
      });

      return {
        message: 'apply jobs successfully',
        status: 200,
        result: result[0],
      };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  }
}
