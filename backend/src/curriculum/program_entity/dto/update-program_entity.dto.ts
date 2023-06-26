import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramEntityDto } from './create-program_entity.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateProgramEntityDto extends PartialType(CreateProgramEntityDto) {
    @IsNotEmpty()
    best_seller: string;
}
