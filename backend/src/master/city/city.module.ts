import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { city } from 'models/master';

@Module({
  imports : [SequelizeModule.forFeature([city])],
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule {}
