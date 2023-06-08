import { Model } from 'sequelize-typescript';
export interface batch_trainee_evaluationAttributes {
    btev_id?: number;
    btev_type?: string;
    btev_header?: string;
    btev_section?: string;
    btev_skill?: string;
    btev_week?: number;
    btev_skor?: number;
    btev_note?: string;
    btev_modified_date?: Date;
    btev_batch_id?: number;
    btev_trainee_entity_id?: number;
}
export declare class batch_trainee_evaluation extends Model<batch_trainee_evaluationAttributes, batch_trainee_evaluationAttributes> implements batch_trainee_evaluationAttributes {
    btev_id?: number;
    btev_type?: string;
    btev_header?: string;
    btev_section?: string;
    btev_skill?: string;
    btev_week?: number;
    btev_skor?: number;
    btev_note?: string;
    btev_modified_date?: Date;
    btev_batch_id?: number;
    btev_trainee_entity_id?: number;
}
