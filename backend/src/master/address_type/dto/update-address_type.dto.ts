import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressTypeDto } from './create-address_type.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAddressTypeDto extends PartialType(CreateAddressTypeDto) {

    @IsNotEmpty()
    @IsString()
    adty_name: string;

}
