import { Model } from 'sequelize-typescript';
export interface working_typeAttributes {
    woty_code: string;
    woty_name?: string;
}
export declare class working_type extends Model<working_typeAttributes, working_typeAttributes> implements working_typeAttributes {
    woty_code: string;
    woty_name?: string;
}
