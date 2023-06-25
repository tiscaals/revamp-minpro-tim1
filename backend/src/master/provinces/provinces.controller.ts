import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';

@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Post()
  create(@Body() createProvinceDto: CreateProvinceDto) {
    return this.provincesService.create(createProvinceDto);
  }

  @Get()
  findAll() {
    return this.provincesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provincesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProvinceDto: UpdateProvinceDto) {
    return this.provincesService.update(+id, updateProvinceDto);
  }

  @Delete(':prov_id')
  remove(@Param('prov_id') prov_id: string) {
    return this.provincesService.remove(+prov_id);
  }
}
