import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sequelize } from 'sequelize-typescript';
import { FindOptions, QueryTypes } from 'sequelize';
import { sales_order_detail } from 'models/sales';

@Injectable()
export class SalesService {
  constructor(private sequelize : Sequelize){}
  
  create(createSaleDto: CreateSaleDto) {
    return 'This action adds a new sale';
  }

  async findAllOrderDetail():Promise<any> {
    const query = 'select * from sales.sales_order_detail';
    const result = await this.sequelize.query(query);
    return result;
  }
  async findAllOrderHeader():Promise<any> {
    const query = 'select * from sales.sales_order_header';
    const result = await this.sequelize.query(query);
    return result;
  }
  async findAllCartItems():Promise<any> {
    const query = 'select * from sales.cart_items';
    const result = await this.sequelize.query(query);
    return result;
  }
  async findAllSpecialOffer():Promise<any> {
    const query = 'select * from sales.special_offer';
    const result = await this.sequelize.query(query);
    return result;
  }
  async findAllSpecialOfferPrograms():Promise<any> {
    const query = 'select * from sales.special_offer_programs';
    const result = await this.sequelize.query(query);
    return result;
  }
  
  async findOne(id: number): Promise<any> {
    const query = 'SELECT * FROM sales.sales_order_detail WHERE sode_id = :id';
    const result = await this.sequelize.query(query, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });

    if (result.length > 0) {
      return result[0]; // Mengembalikan data sale jika ditemukan
    } else {
      throw new NotFoundException(`Sale with ID ${id} not found`); // Melakukan throw error jika tidak ditemukan
    }
  }
  

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
