import { Module } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { program_entity } from 'models/curriculum/program_entity';
import { program_entity_description } from 'models/curriculum/program_entity_description';



@Module({
  imports: [SequelizeModule.forFeature([program_entity, program_entity_description])],
  controllers: [CurriculumController],
  providers: [CurriculumService]
})
export class CurriculumModule {}
