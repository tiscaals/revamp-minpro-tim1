import { Model } from 'sequelize-typescript';
export interface program_reviewsAttributes {
    prow_user_entity_id: number;
    prow_prog_entity_id: number;
    prow_review?: string;
    prow_rating?: number;
    prow_modified_date?: Date;
}
export declare class program_reviews extends Model<program_reviewsAttributes, program_reviewsAttributes> implements program_reviewsAttributes {
    prow_user_entity_id: number;
    prow_prog_entity_id: number;
    prow_review?: string;
    prow_rating?: number;
    prow_modified_date?: Date;
}
