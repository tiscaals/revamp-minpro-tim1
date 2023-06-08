import { Model } from 'sequelize-typescript';
export interface rolesAttributes {
    role_id?: number;
    role_name?: string;
    role_type?: string;
    role_modified_date?: Date;
}
export declare class roles extends Model<rolesAttributes, rolesAttributes> implements rolesAttributes {
    role_id?: number;
    role_name?: string;
    role_type?: string;
    role_modified_date?: Date;
}
