import { Model } from 'sequelize-typescript';
export interface employee_department_historyAttributes {
    edhi_id?: number;
    edhi_entity_id: number;
    edhi_start_date?: string;
    edhi_end_date?: string;
    edhi_modified_date?: Date;
    edhi_dept_id?: number;
}
export declare class employee_department_history extends Model<employee_department_historyAttributes, employee_department_historyAttributes> implements employee_department_historyAttributes {
    edhi_id?: number;
    edhi_entity_id: number;
    edhi_start_date?: string;
    edhi_end_date?: string;
    edhi_modified_date?: Date;
    edhi_dept_id?: number;
}
