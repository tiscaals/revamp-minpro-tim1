import { IsNotEmpty, IsString } from "class-validator";

export class CreateSkillTypeDto {
    @IsNotEmpty()
    @IsString()
    skty_name : string;
}
