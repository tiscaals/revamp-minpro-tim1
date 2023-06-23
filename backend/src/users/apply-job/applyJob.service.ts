import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UpdateApplyJobsDto } from '../dto/update-user.dto';

@Injectable()
export class ApplyJobService {
  constructor(private sequelize: Sequelize) {}

  async applyJobs(id:number, updateApplyJobsDto: UpdateApplyJobsDto): Promise<any>{
    try {
        
    } catch (error) {
        return{message:error.message, status:400}
    }
  }
}
