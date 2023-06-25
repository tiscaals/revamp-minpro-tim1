import { IsNotEmpty, IsString } from "class-validator";


export class CreateRouteActionDto {
    @IsNotEmpty()
    @IsString()
    roac_name :string;

    roac_orderby : any;

    roac_display : string;

    roac_module_name : string;
}
