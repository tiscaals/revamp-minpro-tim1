import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDtoDto } from './create-users-dto.dto';

export class UpdateUsersDtoDto extends PartialType(CreateUsersDtoDto) {}
