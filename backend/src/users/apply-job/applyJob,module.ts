import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApplyJobController } from './applyJob.controller';
import { ApplyJobService } from './applyJob.service';
@Module({
  imports: [SequelizeModule.forFeature([])],
  controllers: [ApplyJobController],
  providers: [ApplyJobService],
})
export class ApplyJobModule {}
