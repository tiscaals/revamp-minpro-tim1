import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExperiencesController } from './experiences.controller';
import { ExperiencesService } from './experiences.service';
@Module({
  imports: [SequelizeModule.forFeature([])],
  controllers: [ExperiencesController],
  providers: [ExperiencesService],
})
export class ExperiencesModule {}
