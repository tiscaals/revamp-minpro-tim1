import { Injectable } from '@nestjs/common';
import { job_photo, job_post, job_post_desc } from 'models/job_hire';
import { Sequelize } from 'sequelize-typescript';
import messageHelper from 'messegeHelper';
import { promises as fsPromises} from 'fs';

@Injectable()
export class JobHireService {
  constructor(
    private sequelize: Sequelize,
  ) {}

  async findCurrentNumber(): Promise<any>{
    try {
      const currentNumber = await job_post.findOne({
        attributes: [
          [Sequelize.literal("LPAD(jopo_id::text, 4, '0')"), "formatted_jopo_id"],
        ],
        order: [["jopo_id", "DESC"]],
        limit: 1,
      });
  
      const formattedJopoId = currentNumber ? currentNumber.get("formatted_jopo_id") : null;
      const tanggalPosting = new Date()
      const formattedDate = tanggalPosting.toISOString().slice(0, 10).replace(/-/g, '');

      const result = `JOB#${formattedDate}-${formattedJopoId}`
      // console.log(formattedJopoId);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async createJopo(fields: any, image:any): Promise<any> {
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
        jopo_joca_id:fields.jopo_joca_id,
        jopo_addr_id:fields.jopo_addr_id,
        jopo_work_code:fields.jopo_work_code,
        jopo_edu_code:fields.jopo_edu_code,
        jopo_status:fields.jopo_status,
        jopo_open:fields.jopo_open
      }]
      console.log("DATA",data);

      const data1: any[] = [{
        jopo_description: fields.jopo_description,
        jopo_responsibility: fields.jopo_responsibility,
        jopo_target: {
          jopo_min_experience: fields.jopo_min_experience,
          jopo_primary_skill: fields.jopo_primary_skill
        },
        jopo_benefit: fields.jopo_benefit
      }];
      console.log("DATA 1",data1);

      const mimetype = image.mimetype;
      //   console.log("MIMETYPE:", mimetype);
        const fileExtension = mimetype.split('/')[1];
      const data2: any[] = [{
        jopho_filename:image.filename,
        jopho_filesize:image.size,
        jopho_filetype:fileExtension
      }];
      console.log("DATA 2",data2);

      const query = `CALL job_hire.createpostingjob('${JSON.stringify(data)}', '${JSON.stringify(data1)}', '${JSON.stringify(data2)}')`;
      const result = await this.sequelize.query(query);

      return messageHelper(result, 201, "Berhasil posting job");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal posting job");
    }
  }

  async findAllJopo(pagination:any, search:any, filter:any, ): Promise<any> {
    try {
      // console.log("PAGINATION", pagination);
      // console.log("SEARCH", search);
      // console.log("FILTER", filter);
      let query = `SELECT * FROM job_hire.job_list_view` 

      //SEARCH
      if (search.keyword || search.location) {
        query += ` WHERE`;
        if (search.keyword) {
          query += ` jopo_title ILIKE '%${search.keyword}%' OR clit_name ILIKE '%${search.keyword}%'`;
        }
        if (search.keyword && search.location) {
          query += ` AND`;
        }
        if (search.location) {
          query += ` city_name ILIKE '%${search.location}%'`;
        }
      } else {
        query += ` WHERE 1=1`; // Placeholder condition to start the query with WHERE
      }

      //FILTER
      //JOB ROLE
      if (filter.job_role) {
        query += ` AND job_role = '${filter.job_role}'`;
      }
      // WORKING TYPE
      if (filter.working_type) {
        query += ` AND jopo_work_code = '${filter.working_type}'`;
      }
      //EXPERIENCE
      if (filter.experience) {
        const [minExperience, maxExperience] = filter.experience.split('-');
        query += ` AND (jopo_min_experience BETWEEN ${minExperience} AND ${maxExperience})`;
      }
      //JOB TYPE
      if (filter.remotely == true) {
        query += ` AND jopo_joty_id = 1`;
      }
      //MATCH/NEWEST
      if (filter.newest) {
        // Calculate the date for '24 Jam Terakhir'
        if (filter.newest === '24 Jam Terakhir') {
          const currentDate = new Date();
          currentDate.setHours(currentDate.getHours() - 24);
          query = ` AND jopo_modified_date >= '${currentDate.toISOString()}'`;
        }
  
        // Calculate the date for 'Seminggu Terakhir'
        if (filter.newest === 'Seminggu Terakhir') {
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() - 7);
          query = ` AND jopo_modified_date >= '${currentDate.toISOString()}'`;
        }
  
        // Calculate the date for 'Sebulan Terakhir'
        if (filter.newest === 'Sebulan Terakhir') {
          const currentDate = new Date();
          currentDate.setMonth(currentDate.getMonth() - 1);
          query = ` AND jopo_modified_date >= '${currentDate.toISOString()}'`;
        }
      }
      if (filter.newest) {
        query += ` ORDER BY jopo_modified_date DESC`;
      }

      //PAGINATION
      query = query + ` LIMIT ${+pagination.limit} OFFSET ${+pagination.offset}`
      console.log(query);
      const result = await this.sequelize.query(query);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} jobHire`;
  }

  async updateJopo(id: number, fields: any, images:any): Promise<any> {
    try {
      const findID = await job_post.findOne({
        where:{
            jopo_entity_id: id
        }
      })
      if(!findID){
          throw new Error ("Job tidak ditemukan")
      }
      console.log("FIELDS",fields);
      console.log("IMAGES",images);
      console.log("IMAGES LENGTH",images.length);
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

      const existingImageNames = await job_photo.findAll({
        where: {
          jopho_entity_id: id
        }
      })
      console.log("EXISTING IMAGE NAMES", existingImageNames);
      const existingFilenames = [];
      existingImageNames.forEach(image => {
        console.log("JOPHO FILENAME",image.jopho_filename);
        existingFilenames.push(image.jopho_filename);
      });
      console.log("EXISTING PATHS",existingFilenames);
      
      existingFilenames.forEach(async(imgPath)=>{
        await fsPromises.unlink(`./images/${imgPath}`);
        await job_photo.destroy({
          where:{
            jopho_entity_id: id,
            jopho_filename: imgPath
          }
        })
        console.log("CURRENT PATHS",existingFilenames);
      })

      let data2:any[] = [];
      for (let index = 0; index < images.length; index++) {
        // console.log(images[index]);
        const mimetype = images[index].mimetype;
        // console.log("MIMETYPE:", mimetype);
        const fileExtension = mimetype.split('/')[1];
        data2.push({
          jopho_entity_id:fields.jopho_entity_id,
          jopho_filename:images[index].filename,
          jopho_filesize:images[index].size,
          jopho_filetype:fileExtension
        } )
        console.log('DATA 2',data2);
      }

      const query = `CALL job_hire.updatepostingjob('${id}','${JSON.stringify(data)}', '${JSON.stringify(data1)}', '${JSON.stringify(data2)}')`;
      const result = await this.sequelize.query(query);

      return messageHelper(result, 200, "Berhasil update job");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal update job");
    }
  }

  async removeJopo(id: number): Promise<any> {
    const transaction = await this.sequelize.transaction(async (t)=>{
      try {
        const existingImageNames = await job_photo.findOne({
          where: {
            jopho_entity_id: id
          },
          transaction: t
        });
        
        const pathFilenames = `./images/${existingImageNames.jopho_filename}`;
        
        await fsPromises.unlink(pathFilenames);
        
        const result1 = await job_photo.destroy({
          where: {
            jopho_entity_id: id
          },
          transaction: t
        });
    
        const result2 = await job_post_desc.destroy({
          where: {
            jopo_entity_id: id
          },
          transaction: t
        });
    
        const result3 = await job_post.destroy({
          where: {
            jopo_entity_id: id
          },
          transaction: t
        })
          
        const result = {result1, result2, result3}
        return messageHelper(result, 200, "Berhasil menghapus")
      } catch (error) {
        await t.rollback()
        throw new Error(error.message);
      }
    });
    return transaction;
  }
}
