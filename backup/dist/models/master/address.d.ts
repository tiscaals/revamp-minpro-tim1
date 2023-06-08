import { Model } from 'sequelize-typescript';
export interface addressAttributes {
    addr_id?: number;
    addr_line1?: string;
    addr_line2?: string;
    addr_postal_code?: string;
    addr_spatial_location?: object;
    addr_modifed_date?: Date;
    addr_city_id?: number;
}
export declare class address extends Model<addressAttributes, addressAttributes> implements addressAttributes {
    addr_id?: number;
    addr_line1?: string;
    addr_line2?: string;
    addr_postal_code?: string;
    addr_spatial_location?: object;
    addr_modifed_date?: Date;
    addr_city_id?: number;
}
