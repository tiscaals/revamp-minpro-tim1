import { Model } from 'sequelize-typescript';
export interface program_entityAttributes {
    prog_entity_id?: number;
    prog_title?: string;
    prog_headline?: string;
    prog_type?: string;
    prog_learning_type?: string;
    prog_rating?: string;
    prog_total_trainee?: number;
    prog_image?: string;
    prog_best_seller?: string;
    prog_price?: string;
    prog_language?: string;
    prog_modified_date?: Date;
    prog_duration?: number;
    prog_duration_type?: string;
    prog_tag_skill?: string;
    prog_city_id?: number;
    prog_cate_id?: number;
    prog_created_by?: number;
    prog_status?: string;
}
export declare class program_entity extends Model<program_entityAttributes, program_entityAttributes> implements program_entityAttributes {
    prog_entity_id?: number;
    prog_title?: string;
    prog_headline?: string;
    prog_type?: string;
    prog_learning_type?: string;
    prog_rating?: string;
    prog_total_trainee?: number;
    prog_image?: string;
    prog_best_seller?: string;
    prog_price?: string;
    prog_language?: string;
    prog_modified_date?: Date;
    prog_duration?: number;
    prog_duration_type?: string;
    prog_tag_skill?: string;
    prog_city_id?: number;
    prog_cate_id?: number;
    prog_created_by?: number;
    prog_status?: string;
}
