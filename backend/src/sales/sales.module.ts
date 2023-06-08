import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';

@Module({
  controllers: [SalesController],
  providers: [SalesService, Sequelize]
})
export class SalesModule {}
