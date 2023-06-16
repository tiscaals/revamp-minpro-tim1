import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  users,
  roles,
  users_email,
  users_roles,
  users_phones,
  phone_number_type,
  users_address,
} from 'models/users';
import { address, address_type, city } from 'models/master';
@Module({
  imports: [
    SequelizeModule.forFeature([
      users,
      users_email,
      users_roles,
      roles,
      users_phones,
      phone_number_type,
      users_address,
      address,
      city,
      address_type,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
