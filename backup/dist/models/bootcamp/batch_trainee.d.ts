import { Model } from 'sequelize-typescript';
export interface batch_traineeAttributes {
    batr_id?: number;
    batr_status?: string;
    batr_certificated?: string;
    batr_certificate_link?: string;
    batr_access_token?: string;
    batr_access_grant?: string;
    batr_review?: string;
    batr_total_score?: string;
    batr_modified_date?: Date;
    batr_trainee_entity_id?: number;
    batr_batch_id: number;
}
export declare class batch_trainee extends Model<batch_traineeAttributes, batch_traineeAttributes> implements batch_traineeAttributes {
    batr_id?: number;
    batr_status?: string;
    batr_certificated?: string;
    batr_certificate_link?: string;
    batr_access_token?: string;
    batr_access_grant?: string;
    batr_review?: string;
    batr_total_score?: string;
    batr_modified_date?: Date;
    batr_trainee_entity_id?: number;
    batr_batch_id: number;
}
