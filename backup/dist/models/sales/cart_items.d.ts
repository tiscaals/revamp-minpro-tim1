import { Model } from 'sequelize-typescript';
export interface cart_itemsAttributes {
    cait_id?: number;
    cait_quantity?: number;
    cait_unit_price?: string;
    cait_modified_date?: Date;
    cait_user_entity_id?: number;
    cait_prog_entity_id?: number;
}
export declare class cart_items extends Model<cart_itemsAttributes, cart_itemsAttributes> implements cart_itemsAttributes {
    cait_id?: number;
    cait_quantity?: number;
    cait_unit_price?: string;
    cait_modified_date?: Date;
    cait_user_entity_id?: number;
    cait_prog_entity_id?: number;
}
