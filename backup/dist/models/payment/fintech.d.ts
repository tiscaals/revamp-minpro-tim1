import { Model } from 'sequelize-typescript';
export interface fintechAttributes {
    fint_entity_id: number;
    fint_code?: string;
    fint_name?: string;
    fint_modified_date?: Date;
}
export declare class fintech extends Model<fintechAttributes, fintechAttributes> implements fintechAttributes {
    fint_entity_id: number;
    fint_code?: string;
    fint_name?: string;
    fint_modified_date?: Date;
}
