import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUsersDto) {}

export class UpdatePasswordDto {
  current_password: string;
  new_password: string;
}
