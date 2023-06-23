import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EducationController } from './education.controller';
import { EducationServices } from './education.service';
@Module({
  imports: [SequelizeModule.forFeature([])],
  controllers: [EducationController],
  providers: [EducationServices],
})
export class EducationModule {}
