import { Model } from 'sequelize-typescript';
export interface countryAttributes {
    country_code: string;
    country_name?: string;
    country_modified_date?: Date;
}
export declare class country extends Model<countryAttributes, countryAttributes> implements countryAttributes {
    country_code: string;
    country_name?: string;
    country_modified_date?: Date;
}
