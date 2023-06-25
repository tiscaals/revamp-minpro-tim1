import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillTemplateDto } from './create-skill_template.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSkillTemplateDto extends PartialType(CreateSkillTemplateDto) {
    @IsNotEmpty()
    @IsString()
    skte_skill:string;

    skte_description:string;

    @IsNotEmpty()
    skte_week:any;

    @IsNotEmpty()
    skte_orderby:any;

    @IsNotEmpty()
    skty_name:string;

    skte_skte_id:number;
}
