import { Model } from 'sequelize-typescript';
export interface users_addressAttributes {
    etad_addr_id: number;
    etad_modified_date?: Date;
    etad_entity_id?: number;
    etad_adty_id?: number;
}
export declare class users_address extends Model<users_addressAttributes, users_addressAttributes> implements users_addressAttributes {
    etad_addr_id: number;
    etad_modified_date?: Date;
    etad_entity_id?: number;
    etad_adty_id?: number;
}
