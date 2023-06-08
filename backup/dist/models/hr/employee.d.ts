import { Model } from 'sequelize-typescript';
export interface employeeAttributes {
    emp_entity_id: number;
    emp_emp_number?: string;
    emp_national_id?: string;
    emp_birth_date?: string;
    emp_marital_status?: string;
    emp_gender?: string;
    emp_hire_date?: string;
    emp_salaried_flag?: string;
    emp_vacation_hours?: number;
    emp_sickleave_hours?: number;
    emp_current_flag?: number;
    emp_modified_date?: Date;
    emp_type?: string;
    emp_joro_id?: number;
    emp_emp_entity_id?: number;
}
export declare class employee extends Model<employeeAttributes, employeeAttributes> implements employeeAttributes {
    emp_entity_id: number;
    emp_emp_number?: string;
    emp_national_id?: string;
    emp_birth_date?: string;
    emp_marital_status?: string;
    emp_gender?: string;
    emp_hire_date?: string;
    emp_salaried_flag?: string;
    emp_vacation_hours?: number;
    emp_sickleave_hours?: number;
    emp_current_flag?: number;
    emp_modified_date?: Date;
    emp_type?: string;
    emp_joro_id?: number;
    emp_emp_entity_id?: number;
}
