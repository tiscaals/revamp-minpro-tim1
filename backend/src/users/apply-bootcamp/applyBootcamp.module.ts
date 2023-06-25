import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApplyBootcampService } from './applyBootcamp.service';
import { ApplyBootcampController } from './applyBootcamp.controller';
@Module({
  imports: [SequelizeModule.forFeature([])],
  controllers: [ApplyBootcampController],
  providers: [ApplyBootcampService],
})
export class ApplyBootcampModule {}
