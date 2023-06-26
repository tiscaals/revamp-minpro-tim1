import { Module } from '@nestjs/common';
import { PlacementService } from './placement.service';
import { PlacementController } from './placement.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  department,
  employee,
  employee_client_contract,
  employee_department_history,
  employee_pay_history,
} from 'models/hr';
import {
  roles,
  users,
  users_address,
  users_education,
  users_email,
  users_experiences,
  users_experiences_skill,
  users_license,
  users_media,
  users_phones,
  users_roles,
  users_skill,
} from 'models/users';

@Module({
  imports: [
    SequelizeModule.forFeature([
      employee,
      employee_department_history,
      employee_client_contract,
      department,
      employee_pay_history,
      users,
      users_experiences,
      users_skill,
      users_address,
      users_experiences_skill,
      users_license,
      users_email,
      users_media,
      roles,
      users_education,
      users_phones,
      users_roles,
    ]),
  ],
  controllers: [PlacementController],
  providers: [PlacementService],
})
export class PlacementModule {}
