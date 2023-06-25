import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { category } from 'models/master';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CategoryService {
  constructor(
    private sequelize: Sequelize){}
  
    async create(data: CreateCategoryDto) {
      try {
        console.log(data)
        const createCategoryDtoJson = JSON.stringify(data);
        const result = await this.sequelize.query(`CALL master.insertcategory('${createCategoryDtoJson}');`);
        return result;
      } catch (error) {
        return error.message;
      }
    }
    

  async findAll() {
    try {
      const result= await this.sequelize.query(` 
      select * from master.view `);
      return result;
    } catch (error) {
      return error.message
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, data: UpdateCategoryDto) {
    try {
      // const createCategoryDtoJson = JSON.stringify(data);
      const result = await this.sequelize.query(`CALL master.updatecategory('${id}', '${data.cate_name}' , '${data.cate_cate_id}')`);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async remove(id : any) {
    try {
      const result= await this.sequelize.query(`CALL master.delete_category_with_nulls(${id}); 
      `);
      return result;
      return result;
    } catch (error) {
      throw error.message;
    }
  }
  
}
