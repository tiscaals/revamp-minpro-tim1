import { Model } from 'sequelize-typescript';
export interface provinceAttributes {
    prov_id?: number;
    prov_code?: string;
    prov_name?: string;
    prov_modified_date?: Date;
    prov_country_code?: string;
}
export declare class province extends Model<provinceAttributes, provinceAttributes> implements provinceAttributes {
    prov_id?: number;
    prov_code?: string;
    prov_name?: string;
    prov_modified_date?: Date;
    prov_country_code?: string;
}
