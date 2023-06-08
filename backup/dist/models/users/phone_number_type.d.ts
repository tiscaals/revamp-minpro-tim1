import { Model } from 'sequelize-typescript';
export interface phone_number_typeAttributes {
    ponty_code: string;
    ponty_modified_date?: Date;
}
export declare class phone_number_type extends Model<phone_number_typeAttributes, phone_number_typeAttributes> implements phone_number_typeAttributes {
    ponty_code: string;
    ponty_modified_date?: Date;
}
