import { Model } from 'sequelize-typescript';
export interface skill_templateAttributes {
    skte_id?: number;
    skte_skill?: string;
    skte_description?: string;
    skte_week?: number;
    skte_orderby?: number;
    skte_modified_date?: Date;
    skty_name?: string;
    skte_skte_id?: number;
}
export declare class skill_template extends Model<skill_templateAttributes, skill_templateAttributes> implements skill_templateAttributes {
    skte_id?: number;
    skte_skill?: string;
    skte_description?: string;
    skte_week?: number;
    skte_orderby?: number;
    skte_modified_date?: Date;
    skty_name?: string;
    skte_skte_id?: number;
}
