import { Model } from 'sequelize-typescript';
export interface sales_order_detailAttributes {
    sode_id?: number;
    sode_qty?: number;
    sode_unit_price?: string;
    sode_unit_discount?: string;
    sode_line_total?: string;
    sode_modified_date?: Date;
    sode_sohe_id?: number;
    sode_soco_id?: number;
    sode_prog_entity_id?: number;
}
export declare class sales_order_detail extends Model<sales_order_detailAttributes, sales_order_detailAttributes> implements sales_order_detailAttributes {
    sode_id?: number;
    sode_qty?: number;
    sode_unit_price?: string;
    sode_unit_discount?: string;
    sode_line_total?: string;
    sode_modified_date?: Date;
    sode_sohe_id?: number;
    sode_soco_id?: number;
    sode_prog_entity_id?: number;
}
