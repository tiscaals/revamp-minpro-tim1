import { Model } from 'sequelize-typescript';
export interface transaction_paymentAttributes {
    trpa_id?: number;
    trpa_code_number?: string;
    trpa_order_number?: string;
    trpa_debet?: string;
    trpa_credit?: string;
    trpa_type?: string;
    trpa_note?: string;
    trpa_modified_date?: Date;
    trpa_source_id?: string;
    trpa_target_id?: string;
    trpa_user_entity_id?: number;
}
export declare class transaction_payment extends Model<transaction_paymentAttributes, transaction_paymentAttributes> implements transaction_paymentAttributes {
    trpa_id?: number;
    trpa_code_number?: string;
    trpa_order_number?: string;
    trpa_debet?: string;
    trpa_credit?: string;
    trpa_type?: string;
    trpa_note?: string;
    trpa_modified_date?: Date;
    trpa_source_id?: string;
    trpa_target_id?: string;
    trpa_user_entity_id?: number;
}
