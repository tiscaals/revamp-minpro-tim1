import { Module } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { ProvincesController } from './provinces.controller';
import { province } from 'models/master';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([province])],
  controllers: [ProvincesController],
  providers: [ProvincesService]
})
export class ProvincesModule {}
