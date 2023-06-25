import { Injectable } from '@nestjs/common';
import { CreateProgramEntityDto } from './dto/create-program_entity.dto';
import { UpdateProgramEntityDto } from './dto/update-program_entity.dto';
import * as fs from 'fs';
import { Sequelize } from 'sequelize-typescript';
import { program_entity } from 'models_curriculum';

@Injectable()
export class ProgramEntityService {
  constructor(private sequelize: Sequelize) {}

  // create program_entity & description
  async create(createProgramEntityDto: any): Promise<any> {
    try {
      console.log(createProgramEntityDto);
      const datas = [
        {
          prog_title: createProgramEntityDto.title,
          prog_headline: createProgramEntityDto.headline,
          prog_type: createProgramEntityDto.type,
          prog_learning_type: createProgramEntityDto.learning_type,
          prog_total_trainee: createProgramEntityDto.total_trainee,
          prog_image: createProgramEntityDto.image,
          prog_price: createProgramEntityDto.price,
          prog_language: createProgramEntityDto.language,
          prog_duration: createProgramEntityDto.duration,
          prog_duration_type: createProgramEntityDto.duration_type,
          prog_tag_skill: createProgramEntityDto.tag_skill,
          prog_city_id: createProgramEntityDto.city_id,
          prog_cate_id: createProgramEntityDto.cate_id,
          prog_created_by: createProgramEntityDto.created_by,
          prog_status: createProgramEntityDto.status,
          payment_type: createProgramEntityDto.payment_type,
          total_batch: createProgramEntityDto.total_batch,
          prog_score: createProgramEntityDto.prog_score,
          prog_curr_regis: createProgramEntityDto.prog_curr_regis,
          pred_item_learning: createProgramEntityDto.item_learning,
          pred_item_include: createProgramEntityDto.item_include,
          pred_requirement: createProgramEntityDto.requirement,
          pred_description: createProgramEntityDto.description,
          pred_target_level: createProgramEntityDto.target_level,
        },
      ];
      console.log(datas);
      const data = `${JSON.stringify(datas)}`;
      const query = `CALL curriculum.program_procedure_coba('${data}')`;
      const result = await this.sequelize.query(query);
      return { data: result, messages: 'Data Sukses Di Input' };
    } catch (error) {
      return error.message;
    }
  }

  // create section 
  async createSectionsDetail(
    id: number,
    createProgramEntity: any,
  ): Promise<any> {
    try {
      console.log(createProgramEntity);
      const data = `[${JSON.stringify(createProgramEntity)}]`;
      const query = `CALL curriculum.section_detail_gas('${id}','${data}')`;
      const result = await this.sequelize.query(query);
      return { data: result, messages: 'Data Sukses Di Input' };
    } catch (error) {
      return error.message;
    }
  }
  
  async createSections(createProgramEntity: any): Promise<any> {
    try {
      console.log(createProgramEntity);
      const data = `[${JSON.stringify(createProgramEntity)}]`;
      const query = `CALL curriculum.sections_gas('${data}')`;
      const result = await this.sequelize.query(query);
      return { data: result, messages: 'Data Sukses Di Input' };
    } catch (error) {
      return error.message;
    }
  }

  // findAll, search.
  async findAll(search: any, filter: any): Promise<any> {
    try {
      let result = `SELECT * FROM curriculum.program_entity`;
      //SEARCH
      if (search) {
        result += `WHERE prog_title ILIKE '%${search}' OR prog_headline ILIKE '%${search}'`;
      } else {
        result += ` WHERE 1=1`;
      }

      if (filter) {
        result += ` AND prog_status = '${filter}'`;
      }
      // result += ` LIMIT ${+pagination.limit} OFFSET ${+pagination.offset}`
      const query = await this.sequelize.query(result);
      return query;
    } catch (error) {
      return error.message;
    }
  }


  // find curriculum number
  async findCurrRegNumber(): Promise<any> {
    try {
      const currentNumber = await program_entity.findOne({
        attributes: [
          [
            Sequelize.literal("LPAD((prog_entity_id + 1)::text, 4, '0')"),
            'formatted_prog_entity_id',
          ],
        ],
        order: [['prog_entity_id', 'DESC']],
        limit: 1,
      });

      const formattedProgEntityId = currentNumber
        ? currentNumber.get('formatted_prog_entity_id')
        : null;
      const tanggalPosting = new Date();
      const formattedDate = tanggalPosting
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '');
      const result = `CURR#${formattedDate}#${formattedProgEntityId}`;
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async update(
    id: number,
    updateProgramEntityDto: any,
    file: Express.Multer.File,
  ) {
    try {
      const program = await program_entity.findByPk(id);
      // console.log(program);
      const data = './image' + program.prog_image;
      if (program && program.prog_image) {
        if (fs.existsSync(data)) {
          fs.unlinkSync(data);
        }
        program.prog_image = file.filename;
      } else {
        throw new Error(`id ${id} Not Found!`);
      }
      // console.log(updateProgramEntityDto);
      const paramProgram = `[${JSON.stringify(updateProgramEntityDto)}]`;
      const query = `CALL curriculum.update_program_coba(${id}, '${paramProgram}')`;
      const result = await this.sequelize.query(query);
      return { data: result, messages: 'Data Sukses Di Update' };
    } catch (error) {
      return error.message;
    }
  }

  async viewSection() {
    try {
      const result = await this.sequelize
        .query(`SELECT * FROM curriculum.sections WHERE sect_prog_entity_id = (SELECT MAX(prog_entity_id) FROM curriculum.program_entity);
      `);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async viewSectionDetail() {
    try {
      const result = await this.sequelize.query(`SELECT *
      FROM curriculum.section_detail
      JOIN curriculum.section_detail_material
      ON section_detail.secd_id = section_detail_material.sedm_secd_id;
      `);
      return result
    } catch (error) {
      return error.message
    }
  }

  async MergeSection(){
    try {
      const section = await this.sequelize
        .query(`SELECT * FROM curriculum.sections WHERE sect_prog_entity_id = (SELECT MAX(prog_entity_id) FROM curriculum.program_entity);
      `);
      const sectionDetail = await this.sequelize.query(`SELECT *
      FROM curriculum.section_detail
      JOIN curriculum.section_detail_material
      ON section_detail.secd_id = section_detail_material.sedm_secd_id;
      `);

      const mergedData = section[0].map((sections:any)=>{
        const sectDet = sectionDetail[0].filter((sectDetail:any)=> sectDetail.secd_sect_id === sections.sect_id)
        return{
          ...sections,
          sectionDetail: sectDet
        }
      })

      return { mergedData }
    } catch (error) {
      
    }
  }

  async findOneCurr(id:number){
    try {
      const result = await this.sequelize.query(`SELECT * FROM curriculum.program_entity JOIN curriculum.program_entity_description ON program_entity.prog_entity_id = program_entity_description.pred_prog_entity_id WHERE prog_entity_id = ${id}`)
      return result[0]
    } catch (error) {
      return error.message
    }
  }

  async remove(id: number) {
    try {
      const result = await program_entity.update(
        {
          prog_status: 'remove',
        },
        {
          where: {
            prog_entity_id: id,
          },
        },
      );
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async findAllTabe(id:number){
    try {
      const result = await this.sequelize.query(`SELECT * FROM curriculum.curr_findone WHERE prog_entity_id = ${id}`)
      return result
    } catch (error) {
      return error.message;
    }
  }

  async updateSection(id:number, updateProgramEntityDto: any){
    try {
      const paramProgram = `[${JSON.stringify(updateProgramEntityDto)}]`;
      const result = await this.sequelize.query(`CALL curriculum.update_section_fix('${id}','${paramProgram}')`)
      return result
    } catch (error) {
      return error.message
    }
  }
}
