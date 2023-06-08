import { Model } from 'sequelize-typescript';
export interface job_categoryAttributes {
    joca_id?: number;
    joca_name?: string;
    joca_modified_date?: Date;
}
export declare class job_category extends Model<job_categoryAttributes, job_categoryAttributes> implements job_categoryAttributes {
    joca_id?: number;
    joca_name?: string;
    joca_modified_date?: Date;
}
