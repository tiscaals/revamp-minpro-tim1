import { Model } from 'sequelize-typescript';
export interface employee_rangeAttributes {
    emra_id?: number;
    emra_range_min?: number;
    emra_range_max?: number;
    emra_modified_date?: Date;
}
export declare class employee_range extends Model<employee_rangeAttributes, employee_rangeAttributes> implements employee_rangeAttributes {
    emra_id?: number;
    emra_range_min?: number;
    emra_range_max?: number;
    emra_modified_date?: Date;
}
