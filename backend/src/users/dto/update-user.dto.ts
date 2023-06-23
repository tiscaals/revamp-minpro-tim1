import { PartialType } from '@nestjs/mapped-types';
import {
  CreateAddressDto,
  CreateApplyJobsDto,
  CreateEducationDto,
  CreateEmailDto,
  CreateExperiencesDto,
  CreatePhoneNumberDto,
  CreateUsersDto,
} from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUsersDto) {}
export class UpdateEmailDto extends PartialType(CreateEmailDto) {}
export class UpdatePhoneNumberDto extends PartialType(CreatePhoneNumberDto) {}
export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
export class UpdateEducationDto extends PartialType(CreateEducationDto) {}
export class UpdateExperiencesDto extends PartialType(CreateExperiencesDto) {}
export class UpdateApplyJobsDto extends PartialType(CreateApplyJobsDto) {}

export class UpdatePasswordDto {
  current_password: string;
  new_password: string;
}

export class UpdateRoleDto {
  role_id: any;
}
