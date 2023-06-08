import { Model } from 'sequelize-typescript';
export interface users_rolesAttributes {
    usro_entity_id: number;
    usro_role_id: number;
    usro_modified_date?: Date;
}
export declare class users_roles extends Model<users_rolesAttributes, users_rolesAttributes> implements users_rolesAttributes {
    usro_entity_id: number;
    usro_role_id: number;
    usro_modified_date?: Date;
}
