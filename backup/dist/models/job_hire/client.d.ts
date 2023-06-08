import { Model } from 'sequelize-typescript';
export interface clientAttributes {
    clit_id?: number;
    clit_name?: string;
    clit_about?: string;
    clit_modified_date?: Date;
    clit_addr_id?: number;
    clit_emra_id?: number;
}
export declare class client extends Model<clientAttributes, clientAttributes> implements clientAttributes {
    clit_id?: number;
    clit_name?: string;
    clit_about?: string;
    clit_modified_date?: Date;
    clit_addr_id?: number;
    clit_emra_id?: number;
}
