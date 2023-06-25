import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
@Module({
  imports: [SequelizeModule.forFeature([])],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
