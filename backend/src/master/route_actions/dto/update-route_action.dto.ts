import { PartialType } from '@nestjs/mapped-types';
import { CreateRouteActionDto } from './create-route_action.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRouteActionDto extends PartialType(CreateRouteActionDto) {
    @IsNotEmpty()
    @IsString()
    roac_name :string;

    roac_orderby : number;

    roac_display : string;

    roac_module_name : string;
}
