import { Module } from '@nestjs/common';
import { ProgramReviewsDtoService } from './program-reviews-dto.service';
import { ProgramReviewsDtoController } from './program-reviews-dto.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {  program_reviews } from 'models_curriculum';

@Module({
  imports: [SequelizeModule.forFeature([program_reviews])],
  controllers: [ProgramReviewsDtoController],
  providers: [ProgramReviewsDtoService]
})
export class ProgramReviewsDtoModule {}
