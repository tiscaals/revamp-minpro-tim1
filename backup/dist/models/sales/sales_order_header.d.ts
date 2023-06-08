import { Model } from 'sequelize-typescript';
export interface sales_order_headerAttributes {
    sohe_id?: number;
    sohe_order_date?: string;
    sohe_due_date?: string;
    sohe_ship_date?: string;
    sohe_order_number?: string;
    sohe_account_number?: string;
    sohe_trpa_code_number?: string;
    sohe_subtotal?: string;
    sohe_tax?: string;
    sohe_total_due?: string;
    sohe_license_code?: string;
    sohe_modified_date?: Date;
    sohe_user_entity_id?: number;
    sohe_status?: string;
}
export declare class sales_order_header extends Model<sales_order_headerAttributes, sales_order_headerAttributes> implements sales_order_headerAttributes {
    sohe_id?: number;
    sohe_order_date?: string;
    sohe_due_date?: string;
    sohe_ship_date?: string;
    sohe_order_number?: string;
    sohe_account_number?: string;
    sohe_trpa_code_number?: string;
    sohe_subtotal?: string;
    sohe_tax?: string;
    sohe_total_due?: string;
    sohe_license_code?: string;
    sohe_modified_date?: Date;
    sohe_user_entity_id?: number;
    sohe_status?: string;
}
