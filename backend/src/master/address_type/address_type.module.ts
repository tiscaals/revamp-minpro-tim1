import { Module } from '@nestjs/common';
import { AddressTypeService } from './address_type.service';
import { AddressTypeController } from './address_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { address_type } from 'models/master';

@Module({
  imports :[SequelizeModule.forFeature([address_type])],
  controllers: [AddressTypeController],
  providers: [AddressTypeService]
})
export class AddressTypeModule {}
