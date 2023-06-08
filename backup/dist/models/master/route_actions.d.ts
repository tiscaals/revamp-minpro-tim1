import { Model } from 'sequelize-typescript';
export interface route_actionsAttributes {
    roac_id: number;
    roac_name?: string;
    roac_orderby?: number;
    roac_display?: string;
    roac_module_name?: string;
}
export declare class route_actions extends Model<route_actionsAttributes, route_actionsAttributes> implements route_actionsAttributes {
    roac_id: number;
    roac_name?: string;
    roac_orderby?: number;
    roac_display?: string;
    roac_module_name?: string;
}
