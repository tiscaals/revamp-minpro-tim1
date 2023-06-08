import { Model } from 'sequelize-typescript';
export interface talent_apply_progressAttributes {
    tapr_id?: number;
    tapr_taap_user_entity_id: number;
    tapr_taap_entity_id: number;
    tapr_modified_date?: Date;
    tapr_status?: string;
    tapr_comment?: string;
    tapr_progress_name?: string;
}
export declare class talent_apply_progress extends Model<talent_apply_progressAttributes, talent_apply_progressAttributes> implements talent_apply_progressAttributes {
    tapr_id?: number;
    tapr_taap_user_entity_id: number;
    tapr_taap_entity_id: number;
    tapr_modified_date?: Date;
    tapr_status?: string;
    tapr_comment?: string;
    tapr_progress_name?: string;
}
