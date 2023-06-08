import { Module } from '@nestjs/common';
import { BootcampService } from './bootcamp.service';
import { BootcampController } from './bootcamp.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { program_apply } from 'models/bootcamp';

@Module({
  imports: [SequelizeModule.forFeature([program_apply])],
  controllers: [BootcampController],
  providers: [BootcampService]
})
export class BootcampModule {}
