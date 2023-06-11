import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { users, roles, users_email, users_roles, users_phones } from 'models';

@Module({
  imports: [
    SequelizeModule.forFeature([users, users_email, users_roles, roles, users_phones]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
