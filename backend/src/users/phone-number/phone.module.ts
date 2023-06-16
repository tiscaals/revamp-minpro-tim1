import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';
@Module({
  imports: [SequelizeModule.forFeature([])],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule {}
