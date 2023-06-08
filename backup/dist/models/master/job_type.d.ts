import { Model } from 'sequelize-typescript';
export interface job_typeAttributes {
    joty_id?: number;
    joty_name?: string;
}
export declare class job_type extends Model<job_typeAttributes, job_typeAttributes> implements job_typeAttributes {
    joty_id?: number;
    joty_name?: string;
}
