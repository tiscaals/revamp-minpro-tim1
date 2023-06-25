import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillTypeDto } from './create-skill_type.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSkillTypeDto extends PartialType(CreateSkillTypeDto) {
    @IsNotEmpty()
    @IsString()
    skty_name_new : string;

}
