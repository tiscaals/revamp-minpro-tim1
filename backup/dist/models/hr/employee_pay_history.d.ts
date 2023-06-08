import { Model } from 'sequelize-typescript';
export interface employee_pay_historyAttributes {
    ephi_entity_id: number;
    ephi_rate_change_date: string;
    ephi_rate_salary?: string;
    ephi_pay_frequence?: number;
    ephi_modified_date?: Date;
}
export declare class employee_pay_history extends Model<employee_pay_historyAttributes, employee_pay_historyAttributes> implements employee_pay_historyAttributes {
    ephi_entity_id: number;
    ephi_rate_change_date: string;
    ephi_rate_salary?: string;
    ephi_pay_frequence?: number;
    ephi_modified_date?: Date;
}
