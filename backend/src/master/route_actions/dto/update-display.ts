import { PartialType } from '@nestjs/mapped-types';
import { CreateRouteActionDto } from './create-route_action.dto';

export class UpdateDisplayDto extends PartialType(CreateRouteActionDto) {

    roac_display : string;

}