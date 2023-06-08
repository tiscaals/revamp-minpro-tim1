import { Model } from 'sequelize-typescript';
export interface program_apply_progressAttributes {
    parog_id?: number;
    parog_user_entity_id: number;
    parog_prog_entity_id: number;
    parog_action_date?: Date;
    parog_modified_date?: Date;
    parog_comment?: string;
    parog_progress_name?: string;
    parog_emp_entity_id?: number;
    parog_status?: string;
}
export declare class program_apply_progress extends Model<program_apply_progressAttributes, program_apply_progressAttributes> implements program_apply_progressAttributes {
    parog_id?: number;
    parog_user_entity_id: number;
    parog_prog_entity_id: number;
    parog_action_date?: Date;
    parog_modified_date?: Date;
    parog_comment?: string;
    parog_progress_name?: string;
    parog_emp_entity_id?: number;
    parog_status?: string;
}
