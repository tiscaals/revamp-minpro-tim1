import { Injectable } from '@nestjs/common';
// import { CreateMasterDto } from './dto/create-master.dto';
// import { UpdateMasterDto } from './dto/update-master.dto';
import { Sequelize } from 'sequelize-typescript';
import messageHelper from 'messegeHelper';

@Injectable()
export class MasterService {
  constructor(readonly sequelize: Sequelize) {}
  // create(createMasterDto: CreateMasterDto) {
  //   return 'This action adds a new master';
  // }

  async findEducation() {
    try {
      const query = `SELECT * FROM master.education`;
      const result = await this.sequelize.query(query);
      return result[0];
    } catch (error) {
      return error.message;
    }
  }

  async findWorktype() {
    try {
      const query = `SELECT * FROM master.working_type`;
      const result = await this.sequelize.query(query);
      return result[0];
    } catch (error) {
      return error.message;
    }
  }

  async findJobrole() {
    try {
      const query = `SELECT * FROM master.job_role`;
      const result = await this.sequelize.query(query);
      return result[0];
    } catch (error) {
      return error.message;
    }
  }

  async findIndustry() {
    try {
      const query = `SELECT * FROM master.industry`;
      const result = await this.sequelize.query(query);
      return result[0];
    } catch (error) {
      return error.message;
    }
  }

  async findCity() {
    try {
      const query = `SELECT * FROM master.city`;
      const result = await this.sequelize.query(query);
      return result[0];
    } catch (error) {
      return error.message;
    }
  }

  async findRouteAction() {
    try {
      const query = `SELECT * FROM master.route_actions  WHERE roac_module_name = 'Job Hire'`;
      const result = await this.sequelize.query(query);
      return result[0];
    } catch (error) {
      return error.message;
    }
  }
}
