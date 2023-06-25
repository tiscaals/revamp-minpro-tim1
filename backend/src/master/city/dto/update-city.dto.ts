import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCityDto extends PartialType(CreateCityDto) {
    @IsNotEmpty()
    @IsString()
    city_name : string;

    @IsNotEmpty()
    @IsNumber()
    city_prov_id : number;
}
