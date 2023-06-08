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
        toBeChanged.push(dbTrainees.filter(obj=>obj.batr_trainee_entity_id === trnee.batr_trainee_entity_id))
        toBeDeleted.push(dbTrainees.filter(obj=>obj.batr_trainee_entity_id !== trnee.batr_trainee_entity_id))
      }

      // const dataString = `[${JSON.stringify(data)}]`
      // const data2String = `[${JSON.stringify(data2)}]`
      // const data3String = `${JSON.stringify(data3)}`

      // await this.sequelize.query(`call bootcamp.updateBatchWithBatchTrainee2 ('${dataString}','${data2String}','${data3String}')`)
      return toBeDeleted
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
      const data = await this.sequelize.query('select * from bootcamp.program_apply')
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
