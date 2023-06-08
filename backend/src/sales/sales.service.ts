import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sequelize } from 'sequelize';

@Injectable()
export class SalesService {
  constructor(private sequelize: Sequelize) {}

  create(createSaleDto: CreateSaleDto) {
    return 'This action adds a new sale';
  }

  async findAllOrderDetail(): Promise<any> {
    const query = 'select * from sales.create_order_detail';
    const results = await this.sequelize.query(query);
    return results;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
