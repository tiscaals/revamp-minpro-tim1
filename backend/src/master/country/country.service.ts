import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { country } from 'models/master';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CountryService {
  constructor(
    private readonly sequelize:Sequelize
  ){}
 async create(createCountryDto: CreateCountryDto) {
    try {
      console.log('sampai sini')
      const result = await country.create(createCountryDto)
      return result
    } catch (error) {
      return error.message
    }
  }

  async findAll() {
    try {
      const result = await country.findAll()
      return result
    } catch (error) {
      return error.message
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  async update(old_country_code : any, updateCountryDto : UpdateCountryDto) {
    try {
      console.log(old_country_code)
      const result = await this.sequelize.query(
        
        `UPDATE master.country SET country_name = '${updateCountryDto.country_name}', country_code = '${updateCountryDto.country_code}' WHERE country_code = '${old_country_code}'`);
      return old_country_code;
    } catch (error) {
      return error.message;
    }
  }
  
  

  async remove(country_code: string) {
    try {
      const result = await country.destroy({where: { country_code: country_code }});
      return result
    } catch (error) {
      
    }
  }
}
