import { Model } from 'sequelize-typescript';
export interface section_detailAttributes {
    secd_id?: number;
    secd_title?: string;
    secd_preview?: string;
    secd_score?: number;
    secd_note?: string;
    secd_minute?: number;
    secd_modified_date?: Date;
    secd_sect_id?: number;
}
export declare class section_detail extends Model<section_detailAttributes, section_detailAttributes> implements section_detailAttributes {
    secd_id?: number;
    secd_title?: string;
    secd_preview?: string;
    secd_score?: number;
    secd_note?: string;
    secd_minute?: number;
    secd_modified_date?: Date;
    secd_sect_id?: number;
}
