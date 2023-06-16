import { PartialType } from '@nestjs/mapped-types';
import {
  CreateAddressDto,
  CreateEmailDto,
  CreatePhoneNumberDto,
  CreateUsersDto,
} from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUsersDto) {}
export class UpdateEmailDto extends PartialType(CreateEmailDto) {}
export class UpdatePhoneNumberDto extends PartialType(CreatePhoneNumberDto) {}
export class UpdateAddressDto extends PartialType(CreateAddressDto) {}

export class UpdatePasswordDto {
  current_password: string;
  new_password: string;
}
