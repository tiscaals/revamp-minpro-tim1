import { Injectable } from '@nestjs/common';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';
import { Sequelize } from 'sequelize-typescript';
import { batch, batch_trainee, program_apply, program_apply_progress } from 'models/bootcamp';

@Injectable()
export class BootcampService {
  constructor(private sequelize: Sequelize) {}

  async createBatch(body: any) {
    try {
      //cek dulu
      const dataString = `[${JSON.stringify(body.batch)}]`;
      const data2String = `${JSON.stringify(body.trainee)}`;
      const data3String = `${JSON.stringify(body.instructors)}`;

      await this.sequelize.query(
        `call bootcamp.createBatch ('${dataString}','${data2String}','${data3String}')`,
      );
      return {
        status: 201,
        message: 'sukses',
      };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async findAllBatch() {
    try {
      const batchdata:any = await this.sequelize.query('select * from bootcamp.batchonly');
      const batchtrainer:any = await this.sequelize.query('select * from bootcamp.batchtrainer');
      const datatrainee:any = await this.sequelize.query('select * from bootcamp.batchtrainee')

      for(let i in batchdata[0]){
        const startdate = new Date(batchdata[0][i].batch_start_date)
        batchdata[0][i].batch_start_date = startdate.toLocaleDateString('en-EN',{
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })

        const enddate = new Date(batchdata[0][i].batch_end_date)
        batchdata[0][i].batch_end_date = enddate.toLocaleDateString('en-EN',{
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      }

      const mergedData = batchdata[0].map((batch:any) => {
        const batchTrainers = batchtrainer[0].filter((trainer:any) => trainer.batch_id === batch.batch_id);
        const trainees = datatrainee[0].filter((trainee:any) => trainee.batr_batch_id === batch.batch_id);
        
        return {
          ...batch,
          trainers: batchTrainers,
          trainees: trainees
        };
      });

      return {
        message: 'sukses',
        data: mergedData
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  async findOneBatch(id: number) {
    try {
      const data = await this.sequelize.query(
        `select * from bootcamp.batch where batch_id=${id}`,
      );
      if (data[0].length === 0) throw new Error('Id tidak ditemukan');

      return {
        status: 200,
        message: 'sukses',
        data: data[0],
      };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async updateBatch(id: number, body: any): Promise<any> {
    try {
      let find: any = await this.sequelize.query(
        `select * from bootcamp.batch where batch_id=${id}`,
      );
      find = find[0][0];
      if (!find) throw new Error('data tidak ditemukan');

      let dbTrainees: any = await this.sequelize.query(
        `select * from bootcamp.batch_trainee where batr_batch_id = ${id}`,
      );

      dbTrainees = dbTrainees[0];

      const { batch, trainee, instructors } = body;

      let toBeDeleted = [];
      let toBeChanged = [];
      let toBeAdded = [];

      for (let trnee of trainee) {
        let found = dbTrainees.find(
          (obj) => obj.batr_trainee_entity_id === trnee.batr_trainee_entity_id,
        );
        if (found) {
          toBeChanged.push(found);
        } else {
          toBeAdded.push(trnee);
        }
      }

      for (let dbtr of dbTrainees) {
        let found = trainee.find(
          (obj) => obj.batr_trainee_entity_id === dbtr.batr_trainee_entity_id,
        );
        if (!found) {
          toBeDeleted.push(dbtr);
        }
      }

      // await this.sequelize.query(`call bootcamp.updateBatchWithBatchTrainee2 ('${dataString}','${data2String}','${data3String}')`)
      return toBeAdded;
      return {
        status: 201,
        message: 'sukses',
      };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async changeStatus(id: number, status: any) {
    try {
      const find = await this.sequelize.query(
        `select * from bootcamp.batch where batch_id = ${id}`,
      );
      if (find[0].length === 0) throw new Error('Data tidak ditemukan');

      const data = await this.sequelize.query(
        `update bootcamp.batch set batch_status = '${status}' where batch_id = ${id} returning *`,
      );
      return {
        status: 200,
        message: 'sukses',
        data: data[0],
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const find = await this.sequelize.query(
        `select * from bootcamp.batch where batch_id=${id}`,
      );
      if (find[0].length === 0) throw new Error('Data tidak ditemukan');
    } catch (error) {}
  }

  async createEvaluation(body: any): Promise<any> {
    try {
      const dataString = `${JSON.stringify(body.weekly_data)}`;
      await this.sequelize.query(
        `call bootcamp.createEvaluation(${body.batr_total_score},'${dataString}')`,
      );

      return {
        status: 201,
        message: 'data berhasil ditambah',
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  async changeProgressName(id: number, name: string) {
    try {
      const data = await program_apply_progress.update(
        {
          parog_progress_name: name,
        },
        {
          where: { parog_id: id },
          returning: true,
        },
      );
      return {
        data: data,
      };
    } catch (error) {
      return error.message;
    }
  }
  //Method Tabel Program Apply dan Program Apply Progress

  async findAllProgramApply() {
    try {
      // const data = await this.sequelize.query('select * from bootcamp.program_apply')
      // const data = await program_apply.findAll()
      // console.log(data)
      const data = await program_apply.findAll();

      return {
        message: 'sukses',
        data: data[0],
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  async createProgram(body: any) {
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
        parog_status,
      } = body.data;

      const data = {
        prap_user_entity_id: prap_user_entity_id,
        prap_prog_entity_id: prap_prog_entity_id,
        prap_test_score: prap_test_score,
        prap_gpa: prap_gpa,
        prap_iq_test: prap_iq_test,
        prap_review: prap_review,
        prap_modified_date: prap_modified_date,
        prap_status: prap_status,
      };

      const data2 = {
        parog_action_date: parog_action_date,
        parog_modified_date: parog_modified_date,
        parog_comment: parog_comment,
        parog_progress_name: parog_progress_name,
        parog_emp_entity_id: parog_emp_entity_id,
        parog_status: parog_status,
      };

      const dataString = `[${JSON.stringify(data)}]`;
      const data2String = `[${JSON.stringify(data2)}]`;

      await this.sequelize.query(
        `call bootcamp.createProgramApply ('${dataString}','${data2String}')`,
      );

      return {
        status: 201,
        message: 'sukses',
      };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async closeBatch (body: any) {
    try {
      const dataTalents = await this.sequelize.query(`select * from bootcamp.selecttalent where batch_id = ${body.batch_id}`)

      const dataString = `[${JSON.stringify(body)}]`;
      const talentString = `${JSON.stringify(dataTalents[0])}`;
      await this.sequelize.query(
        `call bootcamp.closebatch ('${dataString}','${talentString}')`,
      );

      return 'jadi'
    } catch (error) {
      return error.message
    }
  }

  async changeStatusBatch(dataBody: any) {
    try {
      const idBody = await batch.findOne(
        {
          where: {batch_id : dataBody.batch_id}
        }
      )
      if (!idBody) throw new Error('Data Batch Tidak diTemukan!!');

      if(dataBody.batch_status === 'running'){
        const dataString = `[${JSON.stringify(dataBody)}]`;
        await this.sequelize.query(
          `call bootcamp.updaterunningbatch ('${dataString}')`,
        );
      } else if(dataBody.batch_status === 'pending' || dataBody.batch_status === 'cancelled' || dataBody.batch_status === 'extend'){
        const result = await batch.update(
          {
            batch_status: dataBody.batch_status,
            batch_reason: dataBody.batch_reason
          },
          {
            where: {
              batch_id: dataBody.batch_id
            },
            returning: true
          },
        )
      }

      return `Status Batch Telah Berubah Menjadi ${dataBody.batch_status.toUpperCase()}`

    } catch (error) {
      return error.message;
    }
  }

  async cobaCoba () {
    try {
      const result = await this.sequelize.query('select * from bootcamp.selecttalent')
      const resultString = `${JSON.stringify(result[0])}`;

      return resultString
    } catch (error) {
      return error.message
    }
  }

  async updateProgramApplyProgress(id: number, body: any) {
    try {
      const idBody = await program_apply_progress.findOne({where: {
        parog_user_entity_id: id,
      }})
      if (!idBody) throw new Error('Data Tidak diTemukan!!');

      const result = await program_apply_progress.update(
        {
          parog_progress_name: body.parog_progress_name
        },
        {
        where: {
          parog_user_entity_id: id,
        },
        returning: true
      }
      );
      return {
        status: 201,
        message: 'sukses',
      };
      
    } catch (error) {
      return error.message;
    }
  }

  async updateProgramApply(id: number, body: any) {
  
    try {
      const idBody = await program_apply.findOne({where: {
        prap_user_entity_id: id,
      }})
      if (!idBody) throw new Error('Data Tidak diTemukan!!');

      const result = await program_apply.update(
        {
          prap_test_score: body.prap_test_score,
          prap_review: body.prap_review,
          prap_status: body.prap_status
        },
        {
          where: {
            prap_user_entity_id: id
          },
          returning: true
        }
      );
      return {
        status: 201,
        message: 'sukses',
        body: body
      };

    } catch (error) {
      return error.message;
    }
  }

  async viewaAllTalents() {
    try {
      // const result = await this.sequelize.query('select * from bootcamp.selecttalent')
      const result = await this.sequelize.query('select * from bootcamp.talentspassed')
      return {
        result: result[0],
        status: 201,
        message: 'sukses',
      }
    } catch (error) {
      
    }
  }

  async getAllTrainers () {
    try {
      let data = await this.sequelize.query(`select * from hr.employee join master.job_role on employee.emp_joro_id = job_role.joro_id join users.users on users.user_entity_id = employee.emp_entity_id where joro_id = 1`)

      if(data[0].length === 0) throw new Error('data tidak ditemukan')

      return {
        message: 'sukses',
        data: data[0]
      }
    } catch (error) {
      return {
        message: error.message
      }
    }
  }

  async getAllPrograms () {
    try {
      let data = await this.sequelize.query('select * from curriculum.program_entity')
      if(data[0].length === 0) throw new Error('Data tidak ditemukan')

      return {
        message: 'sukses',
        data: data[0]
      }
    } catch (error) {
      return {
        message: error.message
      }
    }
  }

}
  