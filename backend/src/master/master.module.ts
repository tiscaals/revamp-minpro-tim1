import { Module } from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
import { city, education, industry, job_role, job_type, modules, route_actions, working_type } from 'models/master';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports :[SequelizeModule.forFeature([working_type, job_role, job_type, city, education, industry, route_actions])],
  controllers: [MasterController],
  providers: [MasterService]
})
export class MasterModule {}
