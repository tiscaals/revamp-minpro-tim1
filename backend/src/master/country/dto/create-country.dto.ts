import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateCountryDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Z]{3}$/)
    country_code : string;

    @IsNotEmpty()
    @IsString()
    country_name : string;

}
