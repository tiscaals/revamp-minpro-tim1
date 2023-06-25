import { Module } from '@nestjs/common';
import { SkillTypeService } from './skill_type.service';
import { SkillTypeController } from './skill_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { skill_type } from 'models/master';

@Module({
  imports: [SequelizeModule.forFeature([skill_type])],
  controllers: [SkillTypeController],
  providers: [SkillTypeService]
})
export class SkillTypeModule {}
