import { Model } from 'sequelize-typescript';
export interface users_accountAttributes {
    usac_bank_entity_id: number;
    usac_fint_entity_id?: number;
    usac_user_entity_id: number;
    usac_account_number?: string;
    usac_saldo?: string;
    usac_type?: string;
    usac_start_date?: Date;
    usac_end_date?: Date;
    usac_modified_date?: Date;
    usac_status?: string;
}
export declare class users_account extends Model<users_accountAttributes, users_accountAttributes> implements users_accountAttributes {
    usac_bank_entity_id: number;
    usac_fint_entity_id?: number;
    usac_user_entity_id: number;
    usac_account_number?: string;
    usac_saldo?: string;
    usac_type?: string;
    usac_start_date?: Date;
    usac_end_date?: Date;
    usac_modified_date?: Date;
    usac_status?: string;
}
