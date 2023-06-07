import { Injectable } from '@nestjs/common';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class BootcampService {
  constructor(private sequelize: Sequelize){}

  async create(body:any) {
    try {
      const {
        batch_entity_id,
        batch_name,
        batch_description,
        batch_start_date,
        batch_end_date,
        batch_status,
        batch_reason,
        batch_type,
        batch_modified_date,
        batch_pic_id,
        batr_status,
        batr_certificated,
        batr_certificate_link,
        batr_access_token,
        batr_access_grant,
        batr_review,
        batr_total_score,
        batr_modified_date,
        batr_trainee_entity_id
      } = body.data

      const data = {
        batch_entity_id: batch_entity_id,
        batch_name: batch_name,
        batch_description: batch_description,
        batch_start_date: batch_start_date,
        batch_end_date: batch_end_date,
        batch_status: batch_status,
        batch_reason: batch_reason,
        batch_type: batch_type,
        batch_modified_date: batch_modified_date,
        batch_pic_id: batch_pic_id,
      }

      const data2 = {
        batr_status: batr_status,
        batr_certificated: batr_certificated,
        batr_certificate_link: batr_certificate_link,
        batr_access_token: batr_access_token,
        batr_access_grant: batr_access_grant,
        batr_review: batr_review,
        batr_total_score: batr_total_score,
        batr_modified_date: batr_modified_date,
        batr_trainee_entity_id: batr_trainee_entity_id
      }

      const data3 = body.instructors

      const dataString = `[${JSON.stringify(data)}]`
      const data2String = `[${JSON.stringify(data2)}]`
      const data3String = `${JSON.stringify(data3)}`

      await this.sequelize.query(`call bootcamp.createBatch ('${dataString}','${data2String}','${data3String}')`)
      return {
        status: 201,
        message: 'sukses'
      }
    } catch (error) {
     return {status: 400, message: error.message} 
    }
  }

  async findAll() {
    try {
      const data = await this.sequelize.query('select * from bootcamp.batch')
      return {
        message: 'sukses',
        data: data[0]
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} bootcamp`;
  }

  update(id: number, updateBootcampDto: UpdateBootcampDto) {
    return `This action updates a #${id} bootcamp`;
  }

  remove(id: number) {
    return `This action removes a #${id} bootcamp`;
  }
}
