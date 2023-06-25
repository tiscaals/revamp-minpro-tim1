import { Module } from '@nestjs/common';
import { SkillTemplateService } from './skill_template.service';
import { SkillTemplateController } from './skill_template.controller';

@Module({
  controllers: [SkillTemplateController],
  providers: [SkillTemplateService]
})
export class SkillTemplateModule {}
