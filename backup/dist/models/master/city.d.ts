import { Model } from 'sequelize-typescript';
export interface cityAttributes {
    city_id?: number;
    city_name?: string;
    city_modified_date?: Date;
    city_prov_id?: number;
}
export declare class city extends Model<cityAttributes, cityAttributes> implements cityAttributes {
    city_id?: number;
    city_name?: string;
    city_modified_date?: Date;
    city_prov_id?: number;
}
