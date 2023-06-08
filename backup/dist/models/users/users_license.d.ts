import { Model } from 'sequelize-typescript';
export interface users_licenseAttributes {
    usli_id?: number;
    usli_license_code?: string;
    usli_modified_date?: Date;
    usli_status?: string;
    usli_entity_id: number;
}
export declare class users_license extends Model<users_licenseAttributes, users_licenseAttributes> implements users_licenseAttributes {
    usli_id?: number;
    usli_license_code?: string;
    usli_modified_date?: Date;
    usli_status?: string;
    usli_entity_id: number;
}
