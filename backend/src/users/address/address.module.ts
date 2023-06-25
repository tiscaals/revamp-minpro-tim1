import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AddressController } from './address.controller';
import { AddressServices } from './address.service';
@Module({
  imports: [SequelizeModule.forFeature([])],
  controllers: [AddressController],
  providers: [AddressServices],
})
export class ProfileAddressModule {}
