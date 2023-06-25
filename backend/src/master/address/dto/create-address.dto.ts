import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    addr_line1 : string;

    @IsNotEmpty()
    @IsString()
    addr_line2 : string;

    @IsNotEmpty()
    addr_postal_code : string;

    @IsNotEmpty()
    addr_spatial_location : any;

    @IsNotEmpty()
    addr_modified_date : string;
}
