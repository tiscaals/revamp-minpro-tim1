import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillTypeService } from './skill_type.service';
import { CreateSkillTypeDto } from './dto/create-skill_type.dto';
import { UpdateSkillTypeDto } from './dto/update-skill_type.dto';

@Controller('skill-type')
export class SkillTypeController {
  constructor(private readonly skillTypeService: SkillTypeService) {}

  @Post()
  create(@Body() createSkillTypeDto: CreateSkillTypeDto) {
    return this.skillTypeService.create(createSkillTypeDto);
  }

  @Get()
  findAll() {
    return this.skillTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillTypeService.findOne(+id);
  }

  @Patch(':skty_name')
  update(@Param('skty_name') skty_name: string, @Body() updateSkillTypeDto: UpdateSkillTypeDto) {
    return this.skillTypeService.update(skty_name, updateSkillTypeDto);
  }
  

  @Delete(':skty_name')
  remove(@Param('skty_name') skty_name: string) {
    return this.skillTypeService.remove(skty_name);
  }
}
