import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCityDto {

    @IsNotEmpty()
    @IsString()
    city_name : string;

    // @IsNotEmpty()
    @IsNumber()
    city_prov_id : number;
}
