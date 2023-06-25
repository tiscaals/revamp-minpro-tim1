import { Module } from '@nestjs/common';
import { RouteActionsService } from './route_actions.service';
import { RouteActionsController } from './route_actions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { route_actions } from 'models/master';

@Module({
  imports : [SequelizeModule.forFeature([route_actions])],
  controllers: [RouteActionsController],
  providers: [RouteActionsService]
})
export class RouteActionsModule {}
