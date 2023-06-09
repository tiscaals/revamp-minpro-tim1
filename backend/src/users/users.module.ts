import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { users, roles, users_email, users_roles } from 'models';

@Module({
  imports: [
    SequelizeModule.forFeature([users, users_email, users_roles, roles]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
