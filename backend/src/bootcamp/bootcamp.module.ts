import { Module } from '@nestjs/common';
import { BootcampService } from './bootcamp.service';
import { BootcampController } from './bootcamp.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { batch, batch_trainee, program_apply } from 'models/bootcamp';
import { users } from 'models/users';

@Module({
  imports: [SequelizeModule.forFeature([program_apply,batch])],
  controllers: [BootcampController],
  providers: [BootcampService],
})
export class BootcampModule {}
