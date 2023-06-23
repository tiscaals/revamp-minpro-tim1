import { Injectable } from '@nestjs/common';
import { client, employee_range, job_photo, job_post, talent_apply, talent_apply_progress } from 'models/job_hire';
import { Sequelize } from 'sequelize-typescript';
import messageHelper from 'messegeHelper';
import { promises as fsPromises} from 'fs';

@Injectable()
export class JobHireService {
  constructor(
    private sequelize: Sequelize,
  ) {}

  // JOB POSTING
  async findCurrentNumber(): Promise<any> { //FIXED
    try {
      const currentNumber = await job_post.findOne({
        attributes: [
          [Sequelize.literal("LPAD((jopo_id+1)::text, 4, '0')"), "formatted_jopo_id"],
        ],
        order: [["jopo_id", "DESC"]],
        limit: 1,
      });
  
      const formattedJopoId = currentNumber ? currentNumber.get("formatted_jopo_id") : null;
      const tanggalPosting = new Date();
      const formattedDate = tanggalPosting.toISOString().slice(0, 10).replace(/-/g, '');
  
      const result = `JOB#${formattedDate}-${formattedJopoId || "0001"}`;
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async createJopo(fields: any, image:any): Promise<any> { //FIXED
    try {
      // console.log("FIELDS",fields);
      // console.log("IMAGES",images);
      // console.log("IMAGES LENGTH",images.length);
      const data: any[] = [{
        jopo_number:fields.jopo_number,
        jopo_title:fields.jopo_title,
        jopo_start_date:fields.jopo_start_date,
        jopo_end_date:fields.jopo_end_date,
        jopo_min_salary:fields.jopo_min_salary,
        jopo_max_salary:fields.jopo_max_salary,
        jopo_min_experience:fields.jopo_min_experience,
        jopo_max_experience:fields.jopo_max_experience,
        jopo_primary_skill:fields.jopo_primary_skill,
        jopo_secondary_skill:fields.jopo_secondary_skill,
        jopo_emp_entity_id:fields.jopo_emp_entity_id, //ngambil id yg login
        jopo_clit_id:fields.jopo_clit_id,
        jopo_joro_id:fields.jopo_joro_id,
        jopo_joty_id:fields.jopo_joty_id,
        // jopo_joca_id:fields.jopo_joca_id,
        jopo_addr_id:fields.jopo_addr_id,
        jopo_work_code:fields.jopo_work_code,
        jopo_edu_code:fields.jopo_edu_code,
        jopo_status:fields.jopo_status,
        jopo_open:fields.jopo_open
      }]
      console.log("DATA",data);

      const data1: any[] = [{
        jopo_description: fields.jopo_description,
        // jopo_responsibility: fields.jopo_responsibility,
        jopo_target: {
          jopo_min_experience: fields.jopo_min_experience,
          jopo_primary_skill: fields.jopo_primary_skill
        },
        jopo_benefit: fields.jopo_benefit
      }];
      console.log("DATA 1",data1);

      const data2: any[] = [{
        jopho_filename:image.filename,
        jopho_filesize:fields.image_size,
        jopho_filetype:fields.image_type
      }];
      console.log("DATA 2",data2);

      const query = `CALL job_hire.createpostingjob('${JSON.stringify(data)}', '${JSON.stringify(data1)}', '${JSON.stringify(data2)}')`;
      const result = await this.sequelize.query(query);

      return messageHelper(result, 201, "Berhasil posting job");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal posting job");
    }
  }

  //ALL ALLLL
  async findAllJopo(): Promise<any> { //FIXED
    try {
      const query = `SELECT * FROM job_hire.job_list_view WHERE jopo_status != 'remove'` 

      const result = await this.sequelize.query(query);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async searchJobPost(
    key: any,
    loc: any,
    job: any,
    type: any,
    jobType: any,
    expe: any,
    terupdate: any,
    newest: any,
  ) {
    try {
      let query = `SELECT * FROM job_hire.job_list_view WHERE 1=1`;
      const queryParams = [];

      if (key) {
        query += ` AND (jopo_title ILIKE $${
          queryParams.length + 1
        } OR clit_name ILIKE $${queryParams.length + 1})`;
        queryParams.push(`%${key}%`);
      }

      if (loc) {
        query += ` AND city_name ILIKE $${queryParams.length + 1}`;
        queryParams.push(`%${loc}%`);
      }

      if (job) {
        query += ` AND joro_name ILIKE $${queryParams.length + 1}`;
        queryParams.push(`%${job}%`);
      }

      if (type) {
        query += ` AND jopo_joty_id = $${queryParams.length + 1}`;
        queryParams.push(type);
      }

      if (jobType) {
        query += ` AND (`;
        const dataJobType = jobType.split(',');

        for (let index = 0; index < dataJobType.length; index++) {
          if (index > 0) {
            query += ` OR`;
          }
          query += ` jopo_work_code = $${queryParams.length + 1}`;
          queryParams.push(dataJobType[index]);
        }

        query += `)`;
      }

      if (expe) {
        query += ` AND (`;
        const dataJobType = expe.split(',');
        const hasil = [];
        for (let i = 0; i < dataJobType.length; i++) {
          const [min, max] = dataJobType[i].split('-').map(Number);
          hasil.push({ min, max });
        }
        for (let index = 0; index < dataJobType.length; index++) {
          if (index > 0) {
            query += ` OR`;
          }
          const minParam = queryParams.length + 1;
          const maxParam = queryParams.length + 2;
          // console.log('MIN', hasil[index].min);
          query += ` jopo_min_experience BETWEEN $${minParam} AND $${maxParam}`;
          queryParams.push(hasil[index].min);
          queryParams.push(hasil[index].max);
        }

        query += `)`;
      }

      if (terupdate === '24 Jam Terakhir') {
        const currentDate = new Date();
        const gmtOffset = 7 * 60 * 60 * 1000;
        currentDate.setTime(currentDate.getTime() + gmtOffset);
        currentDate.setHours(currentDate.getHours() - 24);
        query += ` AND jopo_modified_date >= $${queryParams.length + 1}`;
        queryParams.push(currentDate);

        console.log('WAKTU JAM', currentDate);
      }
      if (terupdate === 'Seminggu Terakhir') {
        const currentDate = new Date();
        const gmtOffset = 7 * 60 * 60 * 1000;
        currentDate.setTime(currentDate.getTime() + gmtOffset);
        currentDate.setDate(currentDate.getDate() - 7);
        query += ` AND jopo_modified_date >= $${queryParams.length + 1}`;
        queryParams.push(currentDate);
        console.log('WAKTU WEEK', currentDate);
      }
      if (terupdate === 'Sebulan Terakhir') {
        const currentDate = new Date();
        const gmtOffset = 7 * 60 * 60 * 1000;
        currentDate.setTime(currentDate.getTime() + gmtOffset);
        currentDate.setMonth(currentDate.getMonth() - 1);
        query += ` AND jopo_modified_date >= $${queryParams.length + 1}`;
        queryParams.push(currentDate);
        console.log('WAKTU MONTH', currentDate);
      }

      query += ` AND jopo_status = 'publish'`;

      if (newest === '1') {
        query += ` ORDER BY jopo_modified_date DESC`;
      }

      console.log(query);

      const result = await this.sequelize.query(query, { bind: queryParams });

      return result[0];
    } catch (error) {
      return error.message;
    }
  }

  async findOneJopo(id: number) { //FIXED
    try {
      const query = `SELECT * FROM job_hire.job_list_view WHERE jopo_entity_id = ${id}`

      const result = await this.sequelize.query(query);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async findJopho() { //FIXED
    try {
      const result = await job_photo.findAll({
        attributes: ['jopho_filename']
      })

      return result;
    } catch (error) {
      return messageHelper("Gagal", 400, error.message)
    }
  }

  async updateJopo(id: number, fields: any, image:any): Promise<any> { //FIXED
    try {
      const findID = await job_post.findOne({
        where:{
            jopo_entity_id: id
        }
      })
      if(!findID){
          throw new Error ("Job tidak ditemukan")
      }
      // console.log("FIELDS",fields);
      // console.log("IMAGES",images);
      // console.log("IMAGES LENGTH",images.length);
      const data:any[] =[{
        jopo_title:fields.jopo_title,
        jopo_start_date:fields.jopo_start_date,
        jopo_end_date:fields.jopo_end_date,
        jopo_min_salary:fields.jopo_min_salary,
        jopo_max_salary:fields.jopo_max_salary,
        jopo_min_experience:fields.jopo_min_experience,
        jopo_max_experience:fields.jopo_max_experience,
        jopo_primary_skill:fields.jopo_primary_skill,
        jopo_secondary_skill:fields.jopo_secondary_skill,
        jopo_emp_entity_id:fields.jopo_emp_entity_id, //id yg login
        jopo_clit_id:fields.jopo_clit_id,
        jopo_joro_id:fields.jopo_joro_id,
        jopo_joty_id:fields.jopo_joty_id,
        jopo_joca_id:fields.jopo_joca_id,
        jopo_addr_id:fields.jopo_addr_id,
        jopo_work_code:fields.jopo_work_code,
        jopo_edu_code:fields.jopo_edu_code,
        jopo_status:fields.jopo_status,
        jopo_open:fields.jopo_open
      }]

      const data1:any[] = [{
        jopo_description: fields.jopo_description,
        jopo_responsibility: fields.jopo_responsibility,
        jopo_target: {
          jopo_min_experience: fields.jopo_min_experience,
          jopo_primary_skill: fields.jopo_primary_skill
        },
        jopo_benefit: fields.jopo_benefit
      }];

      const existingImageNames = await job_photo.findOne({
        where: {
          jopho_entity_id: id
        }
      })
      console.log("EXISTING IMAGE NAMES", existingImageNames);
      const hapusFoto = await fsPromises.unlink(`./images/job_photo/${existingImageNames.jopho_filename}`);

      console.log(hapusFoto);

      const mimetype = image.mimetype;
      const fileExtension = mimetype.split('/')[1];

      const data2:any[] = [{
        jopho_filename:image.filename,
        jopho_filesize:image.size,
        jopho_filetype:fileExtension
      }]

      console.log('DATA 2',data2);

      const query = `CALL job_hire.updatepostingjob('${id}','${JSON.stringify(data)}', '${JSON.stringify(data1)}', '${JSON.stringify(data2)}')`;
      const result = await this.sequelize.query(query);

      return messageHelper(result, 200, "Berhasil update job");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal update job");
    }
  }

  async removeJopoSoft(id: number): Promise<any> { //FIXED
    try {
      const result = await job_post.update({
        jopo_status: 'remove' 
      },{
        where:{
          jopo_entity_id: id
        }
      })

      return messageHelper(result, 200, "Berhasil menghapus")
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal menghapus")
    };
  }

  async updateStatus(fields: any) {
    try {
      console.log(fields);
      const result = await job_post.update(
        {
          jopo_status: fields.status,
        },
        { where: { jopo_entity_id: fields.id } },
      );

      return messageHelper(result, 201, 'Status Berhasil diUpdate');
    } catch (error) {
      return messageHelper(error.message, 400, 'Status Gagal diUpdate');
    }
  }

  // CLIENT
  async createClient(fields:any): Promise <any> {  //FIXED
    try {
      const data: any[] = [{
        addr_line1: fields.addr_line1,
        addr_line2: fields.addr_line2,
        addr_postal_code: fields.addr_postal_code,
        addr_spatial_location: fields.addr_spatial_location,
        addr_city_id: fields.addr_city_id
      }]
      console.log("DATA",data);

      const data1: any[] = [{
        clit_name: fields.clit_name,
        clit_about: fields.clit_about,
        // clit_addr_id: fields.clit_addr_id,
        clit_emra_id: fields.clit_emra_id,
        clit_indu_code: fields.clit_indu_code
      }]
      console.log("DATA 1",data1);

      const query = `CALL job_hire.createclient('${JSON.stringify(data)}', '${JSON.stringify(data1)}')`;
      const result = await this.sequelize.query(query);

      return messageHelper(result, 200, "Berhasil menambah Client")
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak bisa menambah Client")
    }
  }

  async findClient(): Promise <any> {
    try {
      const result = await client.findAll()

      return result;
    } catch (error) {
      return messageHelper("Gagal", 400, error.message)
    }
  }

  //CLIENT ALL ALLLLLL
  async findAllClient() { //FIXED
    try {
      let query = `SELECT * FROM job_hire.client_view`

      console.log(query);
      const result = await this.sequelize.query(query);
      return result[0];
    } catch (error) {
      return error.message;
    }
  }

  async findOneClient(id: number) {
    try {
      const result = await this.sequelize.query(
        `SELECT * FROM job_hire.client_view where clit_id = ${id}`,
      );
      return result[0]
    } catch (error) {
      return messageHelper(error.message, 'Gagal', 400);
    }
  }

  // LIMIT + PAGINATION
  // async findAllClient(pagination:any, search:any) { //FIXED
  //   try {
  //     let query = `SELECT * FROM job_hire.client_view`

  //     //SEARCH
  //     if (search) {
  //       query += ` WHERE clit_name ILIKE '%${search}%' OR clit_indu_code ILIKE '%${search}%'`
  //     }

  //     //PAGINATION
  //     query += ` LIMIT ${+pagination.limit} OFFSET ${+pagination.offset}`
  //     console.log(query);
  //     const result = await this.sequelize.query(query);
  //     return result;
  //   } catch (error) {
  //     return error.message;
  //   }
  // }

  async updateClient(id:number, fields:any): Promise <any> { //FIXED
    try {
      const findID = await client.findOne({
        where:{
          clit_id: id
        }
      })
      if (!findID) {
        throw new Error ("Client tidak ditemukan")
      }

      const data: any[] = [{
        addr_line1: fields.addr_line1,
        addr_line2: fields.addr_line2,
        addr_postal_code: fields.addr_postal_code,
        addr_spatial_location: fields.addr_spatial_location,
        addr_city_id: fields.addr_city_id
      }]
      // console.log("DATA",data);

      const data1: any[] = [{
        clit_name: fields.clit_name,
        clit_about: fields.clit_about,
        clit_addr_id: fields.clit_addr_id,
        clit_emra_id: fields.clit_emra_id,
        clit_indu_code: fields.clit_indu_code
      }]
      // console.log("DATA 1",data1);

      const query = `CALL job_hire.updateclient('${id}','${JSON.stringify(data)}', '${JSON.stringify(data1)}')`;
      const result = await this.sequelize.query(query);

      return messageHelper(result, 200, "Berhasil update Client")
    } catch (error) {
        return messageHelper(error.message, 400, "Tidak bisa update Client")
    }
  }

  // EMPLOYEE RANGE
  async findAllEmprange() {
    try {
      const result = await employee_range.findAll();

      return result;
    } catch (error) {
      return error.message;
    }
  }

  // TALENT APPLY
  async createTalent(fields:any): Promise <any> {
    try {
      const data: any[] = [{
        taap_user_entity_id: fields.user_entity_id,
        taap_entity_id: fields.entity_id
      }]
      console.log("DATA",data);

      const query = `CALL job_hire.createtalent('${JSON.stringify(data)}')`;
      const result = await this.sequelize.query(query);

      return messageHelper(result, 200, "Berhasil daftar")
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak bisa daftar")
    }
  }

  async findProCandidate() {
    try {
      const query = `SELECT * FROM job_hire.pro_candidate_view`;
      const result = await this.sequelize.query(query);
      return result[0];
    } catch (error) {
      return error.message;
    }
  }
  
  async updateTalent(id: number, fields: any): Promise<any> {
    try {
      const result = await this.sequelize.transaction(async (t) => {
        const resultTaap = await talent_apply.update(
          { taap_status: fields.taap_status },
          {
            where: { taap_user_entity_id: id },
            transaction: t
          }
        );
  
        const resultTapr = await talent_apply_progress.update(
          { tapr_progress_name: fields.tapr_progress_name },
          {
            where: { tapr_taap_user_entity_id: id },
            transaction: t
          }
        );
  
        if (fields.taap_scoring || fields.tapr_comment) {
          const resultTaapScore = await talent_apply.update(
            { taap_scoring: fields.taap_scoring },
            {
              where: { taap_user_entity_id: id },
              transaction: t
            }
          );
  
          const resultTaprComment = await talent_apply_progress.update(
            { tapr_comment: fields.tapr_comment },
            {
              where: { tapr_taap_user_entity_id: id },
              transaction: t
            }
          );

          return messageHelper(
            { 
              resultTaap,
              resultTapr,
              resultTaapScore,
              resultTaprComment
            },
            200,
            "Berhasil Update"
          );
        } else {
          return messageHelper(
            { resultTaap, resultTapr },
            200,
            "Berhasil Update"
          );
        }
      });
  
      return result;
    } catch (error) {
      throw error.message;
    }
  }  
}

