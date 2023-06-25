import { Module } from '@nestjs/common';
import { HrDtoService } from './hr-dto.service';
import { HrDtoController } from './hr-dto.controller';
import { employee } from 'models_hr';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([employee])],
  controllers: [HrDtoController],
  providers: [HrDtoService]
})
export class HrDtoModule {}
