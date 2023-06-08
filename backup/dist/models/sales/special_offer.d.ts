import { Model } from 'sequelize-typescript';
export interface special_offerAttributes {
    spof_id?: number;
    spof_description?: string;
    spof_discount?: string;
    spof_type?: string;
    spof_start_date?: string;
    spof_end_date?: string;
    spof_min_qty?: number;
    spof_max_qty?: number;
    spof_modified_date?: Date;
    spof_cate_id?: number;
}
export declare class special_offer extends Model<special_offerAttributes, special_offerAttributes> implements special_offerAttributes {
    spof_id?: number;
    spof_description?: string;
    spof_discount?: string;
    spof_type?: string;
    spof_start_date?: string;
    spof_end_date?: string;
    spof_min_qty?: number;
    spof_max_qty?: number;
    spof_modified_date?: Date;
    spof_cate_id?: number;
}
