import { Model } from 'sequelize-typescript';
export interface usersAttributes {
    user_entity_id: number;
    user_name?: string;
    user_password?: string;
    user_first_name?: string;
    user_last_name?: string;
    user_birth_date?: string;
    user_email_promotion?: number;
    user_demographic?: object;
    user_modified_date?: Date;
    user_photo?: string;
    user_current_role?: number;
}
export declare class users extends Model<usersAttributes, usersAttributes> implements usersAttributes {
    user_entity_id: number;
    user_name?: string;
    user_password?: string;
    user_first_name?: string;
    user_last_name?: string;
    user_birth_date?: string;
    user_email_promotion?: number;
    user_demographic?: object;
    user_modified_date?: Date;
    user_photo?: string;
    user_current_role?: number;
}
