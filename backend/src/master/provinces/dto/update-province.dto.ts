import { PartialType } from '@nestjs/mapped-types';
import { CreateProvinceDto } from './create-province.dto';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {
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
