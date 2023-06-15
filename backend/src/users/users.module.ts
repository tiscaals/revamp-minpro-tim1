import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MulterModule } from '@nestjs/platform-express';
import {
  users,
  roles,
  users_email,
  users_roles,
  users_phones,
  phone_number_type,
} from 'models';

@Module({
  imports: [
    MulterModule.register({
      dest: './public/user-image',
    }),
    SequelizeModule.forFeature([
      users,
      users_email,
      users_roles,
      roles,
      users_phones,
      phone_number_type,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
