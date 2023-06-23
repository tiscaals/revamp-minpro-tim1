import { Module } from '@nestjs/common';
import { UsersDtoService } from './users-dto.service';
import { UsersDtoController } from './users-dto.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from 'models_users';

@Module({
  imports:[SequelizeModule.forFeature([users])],
  controllers: [UsersDtoController],
  providers: [UsersDtoService]
})
export class UsersDtoModule {}
