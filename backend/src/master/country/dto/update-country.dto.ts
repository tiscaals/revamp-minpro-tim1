import { PartialType } from '@nestjs/mapped-types';
import { CreateCountryDto } from './create-country.dto';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateCountryDto extends PartialType(CreateCountryDto) {
    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Z]{3}$/)
    country_code : string;

    @IsNotEmpty()
    @IsString()
    country_name : string;
}
