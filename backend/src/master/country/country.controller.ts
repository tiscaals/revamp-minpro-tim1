import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countryService.create(createCountryDto);
  }

  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(+id);
  }

  @Patch(':old_country_code')
  update(@Param('old_country_code') old_country_code: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countryService.update(old_country_code, updateCountryDto);
  }

  @Delete(':country_code')
  remove(@Param('country_code') country_code: string) {
    return this.countryService.remove(country_code);
  }
}
