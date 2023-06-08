import { Model } from 'sequelize-typescript';
export interface departmentAttributes {
    dept_id?: number;
    dept_name?: string;
    dept_modified_date?: Date;
}
export declare class department extends Model<departmentAttributes, departmentAttributes> implements departmentAttributes {
    dept_id?: number;
    dept_name?: string;
    dept_modified_date?: Date;
}
