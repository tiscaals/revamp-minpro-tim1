import { IsNotEmpty, IsString } from "class-validator";

export class CreateModuleDto {
    @IsNotEmpty()
    @IsString()
    module_name : string;
}
