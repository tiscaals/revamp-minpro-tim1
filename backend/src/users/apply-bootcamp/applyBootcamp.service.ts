import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { users } from 'models/users/users';
import * as fs from 'fs-extra';

const port = process.env.PORT
@Injectable()
export class ApplyBootcampService {
  constructor(private sequelize: Sequelize) {}

  async applyBootcamp(id: any, updateBootcamp: any): Promise<any> {
    try {
      const query = `CALL users.apply_jobs(:user_id, :firstname, :lastname, :userphoto, :birthdate, :user_school, :user_degree, :user_field_study, :user_phone_number, :user_resume, :user_filelink, :user_filesize, :user_filetype, :role_id )`;
      const result = await this.sequelize.query(query, {
        replacements: {
          user_id: id,
          firstname: updateBootcamp.firstname,
          lastname: updateBootcamp.lastname,
          userphoto: updateBootcamp.userphoto,
          birthdate: updateBootcamp.birthdate,
          user_school: updateBootcamp.user_school,
          user_degree: updateBootcamp.user_degree,
          user_field_study: updateBootcamp.user_field_study,
          user_phone_number: updateBootcamp.user_phone_number,
          user_resume: updateBootcamp.user_resume,
          user_filelink: `http://localhost:${port}/files/user-media/${updateBootcamp.user_resume}`,
          user_filesize: updateBootcamp.user_filesize,
          user_filetype: updateBootcamp.user_filetype,
          role_id: updateBootcamp.role_id,
        },
      });

      const newObj = {
        prap_user_entity_id: id,
        prap_prog_entity_id: updateBootcamp.prap_prog_entity_id,
      };
      const newObj2 = {
        parog_progress_name: 'apply',
        parog_status: 'open',
      };

      const objString = `[${JSON.stringify(newObj)}]`;
      const objString2 = `[${JSON.stringify(newObj2)}]`;
      await this.sequelize.query(
        `call bootcamp.createProgramApply('${objString}','${objString2}')`,
      );

      return {
        message: 'apply bootcamp successfully',
        status: 200,
        result: result[0],
      };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  }
}
