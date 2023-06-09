import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { roles, users, users_email, users_roles } from 'models';

@Module({
  imports: [
    SequelizeModule.forFeature([users, users_email, roles, users_roles]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
