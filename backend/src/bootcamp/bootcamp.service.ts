import { Injectable } from '@nestjs/common';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';
import { Sequelize } from 'sequelize-typescript';
import { program_apply, program_apply_progress } from 'models/bootcamp';

@Injectable()
export class BootcampService {
  constructor(private sequelize: Sequelize){}

  async createBatch(body:any) {
    try {
      //cek dulu 
      const dataString = `[${JSON.stringify(body.batch)}]`
      const data2String = `${JSON.stringify(body.trainee)}`
      const data3String = `${JSON.stringify(body.instructors)}`

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
      let find:any = await this.sequelize.query(`select * from bootcamp.batch where batch_id=${id}`)
      find = find[0][0]
      if (!find) throw new Error('data tidak ditemukan');

      let dbTrainees:any = await this.sequelize.query(`select * from bootcamp.batch_trainee where batr_batch_id = ${id}`)
      dbTrainees = dbTrainees[0]

      const {batch, trainee, instructors} = body

      let toBeDeleted = []
      let toBeChanged = []
      let toBeAdded = []

      for(let trnee of trainee){
        let found = dbTrainees.find(obj => obj.batr_trainee_entity_id === trnee.batr_trainee_entity_id);
        if (found) {
          toBeChanged.push(found);
        } else {
          toBeAdded.push(trnee);
        }
      }

      for(let dbtr of dbTrainees){;
        let found = trainee.find(obj=> obj.batr_trainee_entity_id === dbtr.batr_trainee_entity_id);
        if(!found){
          toBeDeleted.push(dbtr)
        }
      }

      // const dataString = `[${JSON.stringify(data)}]`
      // const data2String = `[${JSON.stringify(data2)}]`
      // const data3String = `${JSON.stringify(data3)}`

      // await this.sequelize.query(`call bootcamp.updateBatchWithBatchTrainee2 ('${dataString}','${data2String}','${data3String}')`)
      return toBeAdded
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
      // const data = await this.sequelize.query('select * from bootcamp.program_apply')
      // const data = await program_apply.findAll()
      // console.log(data)
      const data = await program_apply.findAll()

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

  async createProgram(body:any) {
    try {
      const {
        prap_user_entity_id,
		    prap_prog_entity_id,
		    prap_test_score,
		    prap_gpa,
		    prap_iq_test,
		    prap_review,
		    prap_modified_date,
		    prap_status,
		    parog_action_date,
		    parog_modified_date,
		    parog_comment,
		    parog_progress_name,
		    parog_emp_entity_id,
		    parog_status
      } = body.data

      const data = {
        prap_user_entity_id: prap_user_entity_id ,
		    prap_prog_entity_id: prap_prog_entity_id,
		    prap_test_score: prap_test_score,
		    prap_gpa: prap_gpa,
		    prap_iq_test: prap_iq_test,
		    prap_review: prap_review,
		    prap_modified_date: prap_modified_date,
		    prap_status: prap_status,
      }

      const data2 = {
		    parog_action_date: parog_action_date,
		    parog_modified_date: parog_modified_date,
		    parog_comment: parog_comment,
		    parog_progress_name: parog_progress_name,
		    parog_emp_entity_id: parog_emp_entity_id,
		    parog_status: parog_status
      }

      const dataString = `[${JSON.stringify(data)}]`
      const data2String = `[${JSON.stringify(data2)}]`

      await this.sequelize.query(`call bootcamp.createProgramApply ('${dataString}','${data2String}')`)

      return {
        status: 201,
        message: 'sukses'
      }

    } catch (error) {
      return {status: 400, message: error.message}
    }

  }

}
