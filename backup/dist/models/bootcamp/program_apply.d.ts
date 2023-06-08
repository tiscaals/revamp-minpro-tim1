import { Model } from 'sequelize-typescript';
export interface program_applyAttributes {
    prap_user_entity_id: number;
    prap_prog_entity_id: number;
    prap_test_score?: number;
    prap_gpa?: string;
    prap_iq_test?: string;
    prap_review?: string;
    prap_modified_date?: Date;
    prap_status?: string;
}
export declare class program_apply extends Model<program_applyAttributes, program_applyAttributes> implements program_applyAttributes {
    prap_user_entity_id: number;
    prap_prog_entity_id: number;
    prap_test_score?: number;
    prap_gpa?: string;
    prap_iq_test?: string;
    prap_review?: string;
    prap_modified_date?: Date;
    prap_status?: string;
}
