import { Module } from '@nestjs/common';
import { JobHireService } from './job-hire.service';
import { JobHireController } from './job-hire.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { client, employee_range, job_category, job_photo, job_post, job_post_desc, talent_apply, talent_apply_progress } from 'models/job_hire';

@Module({
  imports: [SequelizeModule.forFeature([job_category, job_photo, job_post, job_post_desc, client, employee_range, talent_apply, talent_apply_progress])],
  controllers: [JobHireController],
  providers: [JobHireService]
})
export class JobHireModule {}