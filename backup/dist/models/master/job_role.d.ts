import { Model } from 'sequelize-typescript';
export interface job_roleAttributes {
    joro_id?: number;
    joro_name?: string;
    joro_modified_date?: Date;
}
export declare class job_role extends Model<job_roleAttributes, job_roleAttributes> implements job_roleAttributes {
    joro_id?: number;
    joro_name?: string;
    joro_modified_date?: Date;
}
