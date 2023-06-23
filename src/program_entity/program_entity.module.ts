import { Module } from '@nestjs/common';
import { ProgramEntityService } from './program_entity.service';
import { ProgramEntityController } from './program_entity.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { program_entity, program_entity_description } from 'models_curriculum';


@Module({
  imports: [SequelizeModule.forFeature([program_entity, program_entity_description])],
  controllers: [ProgramEntityController],
  providers: [ProgramEntityService]
})
export class ProgramEntityModule {}
