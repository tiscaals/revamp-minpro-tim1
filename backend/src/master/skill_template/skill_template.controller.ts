import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillTemplateService } from './skill_template.service';
import { CreateSkillTemplateDto } from './dto/create-skill_template.dto';
import { UpdateSkillTemplateDto } from './dto/update-skill_template.dto';

@Controller('skill-template')
export class SkillTemplateController {
  constructor(private readonly skillTemplateService: SkillTemplateService) {}

  @Post()
  create(@Body() createSkillTemplateDto: CreateSkillTemplateDto) {
    return this.skillTemplateService.create(createSkillTemplateDto);
  }

  @Get()
  findAll() {
    return this.skillTemplateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillTemplateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkillTemplateDto: UpdateSkillTemplateDto) {
    return this.skillTemplateService.update(+id, updateSkillTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillTemplateService.remove(+id);
  }
}
