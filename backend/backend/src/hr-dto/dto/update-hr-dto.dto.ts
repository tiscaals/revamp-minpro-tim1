import { PartialType } from '@nestjs/mapped-types';
import { CreateHrDtoDto } from './create-hr-dto.dto';

export class UpdateHrDtoDto extends PartialType(CreateHrDtoDto) {}
