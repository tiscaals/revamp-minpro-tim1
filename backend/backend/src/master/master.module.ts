import { Module } from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { category } from 'models_master';

@Module({
  imports: [SequelizeModule.forFeature([category])],
  controllers: [MasterController],
  providers: [MasterService]
})
export class MasterModule {}
