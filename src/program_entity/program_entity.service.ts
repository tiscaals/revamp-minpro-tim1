import { Injectable } from '@nestjs/common';
import { CreateProgramEntityDto } from './dto/create-program_entity.dto';
import { UpdateProgramEntityDto } from './dto/update-program_entity.dto';
import * as fs from 'fs';
import { Sequelize } from 'sequelize-typescript';
import { program_entity } from 'models_curriculum';

@Injectable()
export class ProgramEntityService {
  constructor(private sequelize: Sequelize) {}
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
    updateProgramEntityDto: UpdateProgramEntityDto,
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

      const datas = {
        prog_entity_id: id,
        prog_title: updateProgramEntityDto.title,
        prog_headline: updateProgramEntityDto.headline,
        prog_type: updateProgramEntityDto.type,
        prog_learning_type: updateProgramEntityDto.learning_type,
        prog_total_trainee: updateProgramEntityDto.total_trainee,
        prog_image: updateProgramEntityDto.image,
        prog_best_seller: updateProgramEntityDto.best_seller,
        prog_price: updateProgramEntityDto.price,
        prog_language: updateProgramEntityDto.language,
        prog_duration: updateProgramEntityDto.duration,
        prog_duration_type: updateProgramEntityDto.duration_type,
        prog_tag_skill: updateProgramEntityDto.tag_skill,
        prog_city_id: updateProgramEntityDto.city_id,
        prog_cate_id: updateProgramEntityDto.cate_id,
        prog_created_by: updateProgramEntityDto.created_by,
        prog_status: updateProgramEntityDto.status,
        payment_type: updateProgramEntityDto.payment_type,
        total_batch: updateProgramEntityDto.total_batch,
        prog_score: updateProgramEntityDto.prog_score,
        prog_curr_regis: updateProgramEntityDto.prog_curr_regis,
        pred_item_learning: updateProgramEntityDto.item_learning,
        pred_item_include: updateProgramEntityDto.item_include,
        pred_requirement: updateProgramEntityDto.requirement,
        pred_description: updateProgramEntityDto.description,
        pred_target_level: updateProgramEntityDto.target_level,
        sect_title: updateProgramEntityDto.titleSection,
        sect_description: updateProgramEntityDto.descriptionSections,
        sect_total_section: updateProgramEntityDto.total_section,
        sect_total_lecture: updateProgramEntityDto.total_lecture,
        sect_total_minute: updateProgramEntityDto.total_minute,
        secd_title: updateProgramEntityDto.titleDetail,
        secd_preview: updateProgramEntityDto.preview,
        secd_note: updateProgramEntityDto.note,
        secd_minute: updateProgramEntityDto.minutes,
        sedm_filename: updateProgramEntityDto.filename,
        sedm_filesize: updateProgramEntityDto.filesize,
        sedm_filetype: updateProgramEntityDto.filetype,
        sedm_filelink: updateProgramEntityDto.filelink,
      };
      console.log(datas);
      const paramProgram = `[${JSON.stringify(datas)}]`;
      const query = `CALL curriculum.update_program_procedure_coba('${id}', '${paramProgram}')`;
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
}
