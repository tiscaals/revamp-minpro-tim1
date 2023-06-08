import { Model } from 'sequelize-typescript';
export interface users_skillAttributes {
    uski_id?: number;
    uski_entity_id: number;
    uski_modified_date?: Date;
    uski_skty_name?: string;
}
export declare class users_skill extends Model<users_skillAttributes, users_skillAttributes> implements users_skillAttributes {
    uski_id?: number;
    uski_entity_id: number;
    uski_modified_date?: Date;
    uski_skty_name?: string;
}
