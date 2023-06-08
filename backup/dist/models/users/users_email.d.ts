import { Model } from 'sequelize-typescript';
export interface users_emailAttributes {
    pmail_entity_id: number;
    pmail_id?: number;
    pmail_address?: string;
    pmail_modified_date?: Date;
}
export declare class users_email extends Model<users_emailAttributes, users_emailAttributes> implements users_emailAttributes {
    pmail_entity_id: number;
    pmail_id?: number;
    pmail_address?: string;
    pmail_modified_date?: Date;
}
