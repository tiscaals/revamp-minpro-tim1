import { Model } from 'sequelize-typescript';
export interface bankAttributes {
    bank_entity_id: number;
    bank_code?: string;
    bank_name?: string;
    bank_modified_date?: Date;
}
export declare class bank extends Model<bankAttributes, bankAttributes> implements bankAttributes {
    bank_entity_id: number;
    bank_code?: string;
    bank_name?: string;
    bank_modified_date?: Date;
}
