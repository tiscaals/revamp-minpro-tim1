import { Injectable } from '@nestjs/common';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';
import { Sequelize } from 'sequelize-typescript';
import { program_apply_progress } from 'models/bootcamp';

@Injectable()
export class BootcampService {
  constructor(private sequelize: Sequelize){}

  async createBatch(body:any) {
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

  async findAllBatch() {
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

  async findOneBatch(id: number) {
    try {
      const data = await this.sequelize.query(`select * from bootcamp.batch where batch_id=${id}`)
      if (data[0].length === 0) throw new Error('Id tidak ditemukan');

      return {
        status: 200,
        message: 'sukses',
        data: data[0]
      }
    } catch (error) {
      return {status: 400, message: error.message} 
    }
  }

  async updateBatch(id: number, body: any): Promise<any> {
    try {
      const find = await this.sequelize.query(`select * from bootcamp.batch where batch_id=${id}`)
      if (find[0].length === 0) throw new Error('Id tidak ditemukan');
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
        batr_trainee_entity_id,
      } = body.data

      const data = {
        batch_id: id,
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

      await this.sequelize.query(`call bootcamp.updateBatchWithBatchTrainee2 ('${dataString}','${data2String}','${data3String}')`)
      return {
        status: 201,
        message: 'sukses'
      }
    } catch (error) {
      return {status: 400, message: error.message} 
    }
  }

  async changeStatus(id: number,status:any) {
    try {
      const find = await this.sequelize.query(`select * from bootcamp.batch where batch_id = ${id}`)
      if(find[0].length === 0) throw new Error('Data tidak ditemukan')

      const data = await this.sequelize.query(`update bootcamp.batch set batch_status = '${status}' where batch_id = ${id} returning *`)
      return {
        status: 200,
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

  async remove(id: number): Promise<any>{
    try{
      const find = await this.sequelize.query(`select * from bootcamp.batch where batch_id=${id}`)
      if(find[0].length === 0) throw new Error('Data tidak ditemukan')

    }catch(error){

    }
  }

  async createEvaluation(body:any): Promise<any>{
    try {
      const dataString = `${JSON.stringify(body.weekly_data)}`
      await this.sequelize.query(`call bootcamp.createEvaluation(${body.batr_total_score},'${dataString}')`)

      return {
        status: 201,
        message: 'data berhasil ditambah'
      }

    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  // async create

  async changeProgressName(id:number, name:string){
    try {
      const data = await program_apply_progress.update({
        parog_progress_name: name
      },{
        where:{parog_id:id},
        returning: true
      })
      return {
        data: data
      }
    } catch (error) {
      return error.message
    }
  }
  //Method Tabel Program Apply dan Program Apply Progress

  async findAllProgramApply() {
    try {
      const data = await this.sequelize.query('select * from bootcamp.program_apply')
      // console.log(data)
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

}
