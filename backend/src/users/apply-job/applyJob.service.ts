import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UpdateApplyJobsDto } from '../dto/update-user.dto';
import { users } from 'models/users/users';

@Injectable()
export class ApplyJobService {
  constructor(private sequelize: Sequelize) {}

  async applyJobs(id:number, updateApplyJobsDto: UpdateApplyJobsDto): Promise<any>{
    try {

      const getPk = await users.findByPk(id);
      const oldImagePath = './images/user-image/' + getPk.user_photo;

      const query = `CALL users.apply_jobs(:user_id, :, :uspo_number, :userphoto, :usro_role_id)`;
      const result = await this.sequelize.query(query, {
        replacements: {
          user_id: id,
          firstname: updateApplyJobsDto.firstname,
          lastname: updateApplyJobsDto.lastname,
          userphoto: updateApplyJobsDto.userphoto,
        //   usro_role_id: updateApplyJobsDto.usro_role_id,
        },
      });

        // IN user_id INT,
        // IN firstname VARCHAR,
        // IN lastname VARCHAR,
        // IN user_school VARCHAR,
        // IN user_degree VARCHAR,
        // IN user_field_study VARCHAR,
        // IN user_phone_number VARCHAR,
        // IN filename VARCHAR,
        // IN filetype VARCHAR,
        // IN role_id INT
      let updatedFields: Partial<UpdateApplyJobsDto> = {

      };

    } catch (error) {
        return{message:error.message, status:400}
    }
  }
}
