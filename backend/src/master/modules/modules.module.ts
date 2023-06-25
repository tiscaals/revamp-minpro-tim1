import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { modules } from 'models/master';

@Module({
  imports :[SequelizeModule.forFeature([modules])],
  controllers: [ModulesController],
  providers: [ModulesService]
})
export class ModulesModule {}
