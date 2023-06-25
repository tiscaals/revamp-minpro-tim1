import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { cart_items, sales_order_detail, sales_order_header, special_offer, special_offer_programs } from 'models/sales';

@Module({
  imports: [SequelizeModule.forFeature([sales_order_detail, sales_order_header, special_offer, special_offer_programs, cart_items])],
  controllers: [SalesController],
  providers: [SalesService]
})
export class SalesModule {}
