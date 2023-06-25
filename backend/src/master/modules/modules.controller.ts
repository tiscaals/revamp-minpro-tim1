import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto);
  }

  @Get()
  findAll() {
    return this.modulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulesService.findOne(+id);
  }

  @Patch(':old_module_name')
  update(@Param('old_module_name') old_module_name: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.update(old_module_name, updateModuleDto);
  }

  @Delete(':module_name')
  remove(@Param('module_name') module_name: string) {
    return this.modulesService.remove(module_name);
  }
}
