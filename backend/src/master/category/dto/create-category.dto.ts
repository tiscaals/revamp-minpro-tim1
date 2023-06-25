import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    cate_name : string;

    @IsNotEmpty()
    cate_cate_id : any;
}
