import { Model } from 'sequelize-typescript';
export interface address_typeAttributes {
    adty_id?: number;
    adty_name?: string;
    adty_modified_date?: Date;
}
export declare class address_type extends Model<address_typeAttributes, address_typeAttributes> implements address_typeAttributes {
    adty_id?: number;
    adty_name?: string;
    adty_modified_date?: Date;
}
