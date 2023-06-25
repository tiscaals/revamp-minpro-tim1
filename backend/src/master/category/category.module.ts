import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { category } from 'models/master';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports :[SequelizeModule.forFeature([category])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
