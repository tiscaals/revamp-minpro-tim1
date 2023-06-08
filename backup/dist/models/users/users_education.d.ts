import { Model } from 'sequelize-typescript';
export interface users_educationAttributes {
    usdu_id?: number;
    usdu_entity_id: number;
    usdu_school?: string;
    usdu_degree?: string;
    usdu_field_study?: string;
    usdu_graduate_year?: string;
    usdu_start_date?: string;
    usdu_end_date?: string;
    usdu_grade?: string;
    usdu_activities?: string;
    usdu_description?: string;
    usdu_modified_data?: Date;
}
export declare class users_education extends Model<users_educationAttributes, users_educationAttributes> implements users_educationAttributes {
    usdu_id?: number;
    usdu_entity_id: number;
    usdu_school?: string;
    usdu_degree?: string;
    usdu_field_study?: string;
    usdu_graduate_year?: string;
    usdu_start_date?: string;
    usdu_end_date?: string;
    usdu_grade?: string;
    usdu_activities?: string;
    usdu_description?: string;
    usdu_modified_data?: Date;
}
