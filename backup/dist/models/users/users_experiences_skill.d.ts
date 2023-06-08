import { Model } from 'sequelize-typescript';
export interface users_experiences_skillAttributes {
    uesk_usex_id: number;
    uesk_uski_id: number;
}
export declare class users_experiences_skill extends Model<users_experiences_skillAttributes, users_experiences_skillAttributes> implements users_experiences_skillAttributes {
    uesk_usex_id: number;
    uesk_uski_id: number;
}
