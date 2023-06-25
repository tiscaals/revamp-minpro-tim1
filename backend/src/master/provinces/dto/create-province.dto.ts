import { IsNotEmpty , IsString, Matches } from "class-validator";

export class CreateProvinceDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Z]{5}$/)
    prov_code :string;

    @IsNotEmpty()
    @IsString()
    prov_name :string;

    @IsNotEmpty()
    prov_country_code :any;

}
