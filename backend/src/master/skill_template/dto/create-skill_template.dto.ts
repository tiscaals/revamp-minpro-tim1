import { IsNotEmpty, IsString } from "class-validator";

export class CreateSkillTemplateDto {
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

