import { Injectable } from '@nestjs/common';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';
import { Sequelize } from 'sequelize-typescript';
import { batch, batch_trainee, program_apply, program_apply_progress } from 'models/bootcamp';
import { log } from 'console';

@Injectable()
export class BootcampService {
  constructor(private sequelize: Sequelize) {}

  async createBatch(body: any) {
    try {
      const trainees = body.trainee;
      const idSet = new Set();

      for (let i = 0; i < trainees.length; i++) {
        const trainee = trainees[i];
        const traineeId = trainee.user_id;
        
        if (idSet.has(traineeId)) {
          throw new Error('Terdapat Peserta dengan ID yang sama');
        }
        idSet.add(traineeId);
      }
      const dataString = `[${JSON.stringify(body.batch)}]`;
      const data2String = `${JSON.stringify(body.trainee)}`;
      const data3String = `${JSON.stringify(body.instructors)}`;

      const data = await this.sequelize.query(
        `call bootcamp.createBatch ('${dataString}','${data2String}','${data3String}')`,
      );
      return {
        status: 201,
        message: 'sukses',
        data: data
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
      const data:any = await this.sequelize.query(
        `select * from bootcamp.batch where batch_id=${id}`,
      );

      const datatrainee:any = await this.sequelize.query('select batr_trainee_entity_id as user_id,batch_id from bootcamp.batch_trainee join bootcamp.batch on batch.batch_id = batch_trainee.batr_batch_id')

      const datatrainer:any = await this.sequelize.query('select trainer_programs.batch_id,tpro_emp_entity_id from bootcamp.trainer_programs join bootcamp.batch on batch.batch_id = trainer_programs.batch_id')
      if (data[0].length === 0) throw new Error('Id tidak ditemukan');

      const mergedData = data[0].map((item: any) => {
        const trainers = datatrainer[0].filter((trainer:any) => trainer.batch_id === item.batch_id);
        const trainees = datatrainee[0].filter((trainee: any) => trainee.batch_id === item.batch_id);
        return { ...item,trainers, trainees };
    });

      return {
        status: 200,
        message: 'sukses',
        dataOne: mergedData
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
        `select batr_trainee_entity_id as user_id from bootcamp.batch_trainee where batr_batch_id = ${id}`,
      );

      dbTrainees = dbTrainees[0];

      const { trainee } = body;
        const toBeAdded = trainee.filter((tr:any)=>{return !dbTrainees.some((dbtr:any)=>tr.user_id === dbtr.user_id)})
        const toBeDeleted = dbTrainees.filter((dbtr:any)=>{return !trainee.some((tr:any)=>dbtr.user_id === tr.user_id)})


      const data1 = `[${JSON.stringify(body.batch)}]`
      const data2 = `${JSON.stringify(toBeAdded)}`
      const data3 = `${JSON.stringify(toBeDeleted)}`
      const data4 = `${JSON.stringify(body.instructors)}`

      await this.sequelize.query(`call bootcamp.updatebatch(${id},'${data1}','${data2}','${data3}','${data4}')`)
      // return {
      //   batch: body.batch,
      //   add: toBeAdded,
      //   del: toBeDeleted,
      //   dbTrainees: dbTrainees,
      //   trainee: trainee
      // }
      return {
        status: 201,
        message: 'sukses',
      };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const find = await this.sequelize.query(
        `select * from bootcamp.batch where batch_id=${id}`,
      );
      if (find[0].length === 0) throw new Error('Data tidak ditemukan');

      await this.sequelize.query(`delete from bootcamp.batch where batch_id = ${id}`)

      return {
        message: "data berhasil dihapus"
      }
    } catch (error) {}
  }

  async createEvaluation(body: any): Promise<any> {
    try {
      const dataString = `${JSON.stringify(body.data)}`;
      const status = body.batr_total_score > 50 ? 'passed': 'failed'
      await this.sequelize.query(
        `call bootcamp.createEvaluation(${body.batr_total_score},'${status}','${dataString}')`,
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

  async changeProgressName(id: number, name: any) {
    try {
      const data = await program_apply_progress.update(
        {
          parog_progress_name: name.parog_progress_name,
        },
        {
          where: { parog_id: id }
        },
      );
      return {
        message: 'sukses update'
      };
    } catch (error) {
      return error.message;
    }
  }

  async findAllProgramApply() {
    try {
      const data = await this.sequelize.query(`select * from bootcamp.selectcandidates `)
      const emailsdata = await this.sequelize.query(`select user_entity_id,pmail_address from users.users join users.users_email on pmail_entity_id = user_entity_id`)

      const phonesdata = await this.sequelize.query(`select user_entity_id,uspo_number,uspo_ponty_code from users.users_phones join users.users on user_entity_id = uspo_entity_id order by uspo_ponty_code asc`)

      const mergedData = data[0].map((item:any)=>{

        const emails = emailsdata[0].filter((em:any)=> em.user_entity_id === item.user_entity_id)
        const phones = phonesdata[0].filter((ph:any)=> ph.user_entity_id === item.user_entity_id)
        return {
          ...item,emails,phones
        }
      })

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

  // async closeBatch (body: any) {
  //   try {
  //     const dataTalents = await this.sequelize.query(`select * from bootcamp.selecttalent where batch_id = ${body.batch_id}`)

  //     const dataString = `[${JSON.stringify(body)}]`;
  //     const talentString = `${JSON.stringify(dataTalents[0])}`;
  //     await this.sequelize.query(
  //       `call bootcamp.closebatch ('${dataString}','${talentString}')`,
  //     );

  //     return 'jadi'
  //   } catch (error) {
  //     return error.message
  //   }
  // }

  async changeStatusBatch(dataBody: any) {
    try {
      const idBody = await batch.findOne(
        {
          where: {batch_id : dataBody.batch_id}
        }
      )
      if (!idBody) throw new Error('Data Batch Tidak diTemukan!!');

      if(dataBody.batch_status === 'running'){
        const dataBatch:any = await this.sequelize.query(`select batch_status from bootcamp.batch where batch_id = ${dataBody.batch_id}`)
        const batchStatus = dataBatch[0][0].batch_status;
        if (dataBody.batch_status === batchStatus) throw new Error('Batch Sudah di Running');

        const trainee = await this.sequelize.query(`select * from bootcamp.batch_trainee where batr_batch_id = ${dataBody.batch_id}`);
        const traineeProgramApply = await this.sequelize.query(`select * from bootcamp.program_apply_progress where parog_prog_entity_id = ${dataBody.batch_entity_id}`);

        const dataString = `[${JSON.stringify(dataBody)}]`;
        const traineeString = `${JSON.stringify(trainee[0])}`;
        const traineeProgramApplyString = `${JSON.stringify(traineeProgramApply[0])}`;

        await this.sequelize.query(
          `call bootcamp.updaterunningbatch ('${dataString}','${traineeString}','${traineeProgramApplyString}')`,
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
      } else if(dataBody.batch_status === 'closed'){
        const dataBatch:any = await this.sequelize.query(`select batch_status from bootcamp.batch where batch_id = ${dataBody.batch_id}`)
        const batchStatus = dataBatch[0][0].batch_status
        if (dataBody.batch_status === batchStatus) throw new Error('Batch Sudah di Closed');

        const dataTalents = await this.sequelize.query(`select * from bootcamp.selecttalent where batch_id = ${dataBody.batch_id} and batr_status = 'passed'`)

        const dataString = `[${JSON.stringify(dataBody)}]`;
        const talentString = `${JSON.stringify(dataTalents[0])}`;
        await this.sequelize.query(
          `call bootcamp.closebatch ('${dataString}','${talentString}')`,
        );
      }
      return {
        status: 201,
        message: `Status Batch Telah Berubah Menjadi ${dataBody.batch_status.toUpperCase()}`
      };

    } catch (error) {
      return error.message;
    }
  }

  async cobaCoba () {
    try {
      const result:any = await this.sequelize.query('select batch_status from bootcamp.batch where batch_id = 24')
      // const resultString = `${JSON.stringify(result[0])}`;
      // console.log(result[0])
      // if (result[0].batch_status === 'closed') throw new Error('Data Batch Sudah di Closed!!')
      // return resultString
      return result[0][0].batch_status
    } catch (error) {
      return error.message
    }
  }

  async updateProgramApply(id: number,progid:number, body: any) {
    try {
      const idBody = await program_apply.findOne({where: {
        prap_user_entity_id: id,
        prap_prog_entity_id: progid
      }})
      if (!idBody) throw new Error('Data Tidak diTemukan!!');

      await program_apply.update(
        {
          prap_test_score: body.prap_test_score,
          prap_review: body.prap_review,
          prap_status: body.prap_status
        },
        {
          where: {
            prap_user_entity_id: id,
            prap_prog_entity_id: progid
          }
        }
      );

      await program_apply_progress.update({
        parog_progress_name: body.parog_progress_name
      },{
        where: {
          parog_id: body.parog_id
        }
      })
      return {
        status: 201,
        message: 'sukses'
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

  async getRecommendedStudents (id:number) {
    console.log(id);
    try {
      //batr_trainee_entity_id
      const data = await this.sequelize.query(`SELECT prap_user_entity_id as user_id,prap_prog_entity_id,user_first_name,user_last_name,user_photo,TO_CHAR(parog_action_date, 'FMMonth DD, YYYY') join_date FROM bootcamp.program_apply JOIN bootcamp.program_apply_progress on prap_user_entity_id=parog_user_entity_id and prap_prog_entity_id = parog_prog_entity_id left JOIN users.users ON user_entity_id= prap_user_entity_id WHERE (prap_status = 'recommendation' OR prap_status = 'passed') AND prap_prog_entity_id = ${id}`)

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

  async getRouteActions () {
    try {
      const data = await this.sequelize.query(`select * from master.route_actions 
      where roac_display = '1' and roac_module_name = 'bootcamp'
      order by roac_orderby`)
      return {
        message: 'sukses',
        data: data[0]
      }
    } catch (error) {
      return error.message
    }
  }

  async getTraineesByBatchId (id:number) {
    try {
      const traineesData = await this.sequelize.query(`select * from bootcamp.batchtrainee where batr_batch_id = ${id}`)
      // const evaluationData = await this.sequelize.query(`select * from bootcamp.batch_trainee_evaluation`)
      return {
        message: 'sukses',
        data: traineesData[0]
      }
    } catch (error) {
      return error.message
    }
  }

  async setTraineeResign (batrid:any,body:{batr_review: string, batr_status: string}):Promise<any> {
    try {
      const data = await this.sequelize.query(`select * from bootcamp.batch_trainee where batr_id = ${batrid}`)
      if(data[0].length === 0) throw new Error('data tidak ditemukan')

      await batch_trainee.update({
        batr_status: body.batr_status,
        batr_review: body.batr_review
      },{
        where:{batr_id : batrid}
      })

      return {
        message: 'data has been updated'
      }

    } catch (error) {
      return {
        message: error.message
      }
    }
  }

}
  