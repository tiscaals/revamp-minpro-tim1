import { Injectable } from '@nestjs/common';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { UpdatePlacementDto } from './dto/update-placement.dto';
import { Sequelize } from 'sequelize-typescript';
import { users } from 'models/usersSchema';
import messageHelper from 'messageHelper';

@Injectable()
export class PlacementService {
  constructor(private sequelize: Sequelize) {}

  async viewEmployee(): Promise<any> {
    try {
      const query = `SELECT * FROM hr.viewAllEmployee  `;
      const result = await this.sequelize.query(query);
      return messageHelper(result, 200, 'OK');
    } catch (error) {
      return messageHelper(error.message, 400, 'Fail');
    }
  }

  async viewTalents(): Promise<any> {
    try {
      const query = `SELECT * FROM hr.talentsView`;
      const result = await this.sequelize.query(query);
      return messageHelper(result, 200, 'OK');
    } catch (error) {
      return messageHelper(error.message, 400, 'Fail');
    }
  }

  async viewTalentsJob(): Promise<any> {
    try {
      const query = `SELECT * FROM job_hire.pro_candidate_view`;
      const result = await this.sequelize.query(query);
      return messageHelper(result, 200, 'OK');
    } catch (error) {
      return messageHelper(error.message, 400, 'Fail');
    }
  }

  async searchUsers(): Promise<any> {
    try {
      const query = `SELECT * FROM users.generate`;
      const result = await this.sequelize.query(query);
      return messageHelper(result, 200, 'OK');
    } catch (error) {
      return messageHelper(error.message, 400, 'Fail');
    }
  }

  async findEmployee(user:any): Promise<any> {
    try {
      const query = `select * from hr.viewalldataemployee where user_entity_id = ${user} order by edhi_modified_date desc limit 1`;
      const result = await this.sequelize.query(query);
      return messageHelper(result, 200, 'OK');
    } catch (error) {
      return messageHelper(error.message, 400, 'Fail');
    }
  }

  async deptHistory(user:any): Promise<any> {
    try {
      const query = `select * from hr.employeeDepartmentHistory where edhi_entity_id = ${user}`;
      const result = await this.sequelize.query(query);
      return messageHelper(result, 200, 'OK');
    } catch (error) {
      return messageHelper(error.message, 400, 'Fail');
    }
  }

  async salaryHistory(user:any): Promise<any> {
    try {
      const query = `select * from hr.employee_pay_history where ephi_entity_id = ${user}`;
      const result = await this.sequelize.query(query);
      return messageHelper(result, 200, 'OK');
    } catch (error) {
      return messageHelper(error.message, 400, 'Fail');
    }
  }

  async searchClient(): Promise<any> {
    try {
      const query = `SELECT * FROM job_hire.client`;
      const result = await this.sequelize.query(query);
      return messageHelper(result, 200, 'OK');
    } catch (error) {
      return messageHelper(error.message, 400, 'Fail');
    }
  }

  async department(): Promise<any> {
    try {
      const query = `SELECT * FROM hr.department`;
      const result = await this.sequelize.query(query);
      return messageHelper(result, 200, 'Ada Data');
    } catch (error) {
      return messageHelper(error.message, 400, 'Fail');
    }
  }

  async masterJoRo(): Promise<any> {
    try {
      const query = `SELECT * FROM master.job_role`;
      const result = await this.sequelize.query(query);
      return messageHelper(result, 200, 'Ada Data');
    } catch (error) {
      return messageHelper(error.message, 400, 'Fail');
    }
  }

  async usersRoles(): Promise<any> {
    try {
      const query = `SELECT * FROM users.roles`;
      const result = await this.sequelize.query(query);
      return messageHelper(result, 200, 'Ada Data');
    } catch (error) {
      return messageHelper(error.message, 400, 'Fail');
    }
  }

  async jobType(): Promise<any> {
    try {
      const query = `SELECT * FROM master.job_type`;
      const result = await this.sequelize.query(query);
      return messageHelper(result, 200, 'Ada Data');
    } catch (error) {
      return messageHelper(error.message, 400, 'Fail');
    }
  }

  async accountManager(): Promise<any> {
    try {
      const query = `SELECT * FROM hr.employee WHERE emp_joro_id = 2`;
      const result = await this.sequelize.query(query);
      return messageHelper(result, 200, 'Ada Data');
    } catch (error) {
      return messageHelper(error.message, 400, 'Fail');
    }
  }

  async createEmployee(create: any): Promise<any> {
    console.log('coba', create);
    try {
      // const user = await users.findOne({
      //   where: { user_entity_id: create.emp_entity_id },
      // });

      // if (!user) {
      //   throw new Error('id tidak ditemukan');
      // } else {
      //   console.log(user);
      const sendData = {
        emp_entity_id: create.emp_entity_id,
        emp_emp_number: create.emp_emp_number,
        emp_national_id: create.emp_national_id,
        emp_birth_date: create.emp_birth_date,
        emp_marital_status: create.emp_marital_status,
        emp_gender: create.emp_gender,
        emp_hire_date: create.emp_hire_date,
        emp_end_contract: create.emp_end_contract,
        emp_salaried_flag: create.emp_salaried_flag,
        emp_vacation_hours: create.emp_vacation_hours,
        emp_sickleave_hours: create.emp_sickleave_hours,
        emp_current_flag: create.emp_current_flag,
        emp_type: create.emp_type,
        emp_joro_id: create.emp_joro_id,
        emp_emp_entity_id: create.emp_emp_entity_id,
        user_role: create.user_role,
        edhi_dept_id: create.edhi_dept_id,
      };

      const data = `${JSON.stringify(sendData)}`;
      console.log('batas');
      console.log(data);
      const query = `CALL hr.createdataemployee('${data}')`;
      console.log(query);
      const result = await this.sequelize.query(query);

      return messageHelper(result, 200, 'Data uploaded');
      // }
    } catch (error) {
      return messageHelper(error.message, 400, 'Tidak Bisa');
    }
  }

  async createContractClientEmployee(createHrDto: any): Promise<any> {
    try {
      const user = await users.findOne({
        where: { user_entity_id: createHrDto.emp_entity_id },
      });
      if (!user) {
        throw new Error('id tidak ada');
      } else {
        const sendData = {
          emp_entity_id: createHrDto.emp_entity_id,
          emp_emp_number: createHrDto.emp_emp_number,
          emp_birth_date: createHrDto.emp_birth_date,
          emp_hire_date: createHrDto.emp_hire_date,
          emp_end_contract: createHrDto.emp_end_contract,
          emp_type: createHrDto.emp_type,
          emp_joro_id: parseInt(createHrDto.emp_joro_id),
          emp_emp_entity_id: createHrDto.emp_emp_entity_id,
          user_role: createHrDto.user_role,
          edhi_dept_id: parseInt(createHrDto.edhi_dept_id),
          ecco_contract_no: createHrDto.ecco_contract_no,
          ecco_contract_date: createHrDto.ecco_contract_date,
          ecco_start_date: createHrDto.ecco_start_date,
          ecco_end_date: createHrDto.ecco_end_date,
          ecco_notes: createHrDto.ecco_notes,
          ecco_media_link: createHrDto.ecco_media_link,
          ecco_joty_id: parseInt(createHrDto.ecco_joty_id),
          ecco_account_manager: createHrDto.ecco_account_manager,
          ecco_clit_id: parseInt(createHrDto.ecco_clit_id),
          ecco_status: createHrDto.ecco_status,
          talent_status: createHrDto.talent_status,
        };

        
        const data = `${JSON.stringify(sendData)}`;
        // console.log("DATAAA", typeof(sendData.ecco_contract_no))
        const query = `CALL hr.CCFromBootcamp_coba('[${data}]')`;
        console.log(query);
        const result = await this.sequelize.query(query);

        return messageHelper(result, 200, 'Bisa');
      }
    } catch (error) {
      return messageHelper(error.message, 400, 'Tidak Bisa');
    }
  }

  async updateEmployee(createHrDto: any): Promise<any> {
    try {
      const user = await users.findOne({
        where: { user_entity_id: createHrDto.emp_entity_id },
      });
      if (!user) {
        throw new Error('id tidak ada');
      } else {
        const sendData = {
          emp_entity_id : createHrDto.emp_entity_id,
          emp_hire_date : createHrDto.emp_hire_date,
          emp_type : createHrDto.emp_type,
          emp_joro_id : createHrDto.emp_joro_id,
          edhi_dept_id: createHrDto.edhi_dept_id
        };   
        const data = `${JSON.stringify(sendData)}`;
        const query = `CALL hr.updateEmp('[${data}]')`;
        console.log(query);
        const result = await this.sequelize.query(query);

        return messageHelper(result, 200, 'Bisa');
      }
    } catch (error) {
      return messageHelper(error.message, 400, 'Tidak Bisa');
    }
  }

}
