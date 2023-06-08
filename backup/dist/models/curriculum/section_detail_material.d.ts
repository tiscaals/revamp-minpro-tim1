import { Model } from 'sequelize-typescript';
export interface section_detail_materialAttributes {
    sedm_id?: number;
    sedm_filename?: string;
    sedm_filesize?: number;
    sedm_filetype?: string;
    sedm_filelink?: string;
    sedm_modified_date?: Date;
    sedm_secd_id?: number;
}
export declare class section_detail_material extends Model<section_detail_materialAttributes, section_detail_materialAttributes> implements section_detail_materialAttributes {
    sedm_id?: number;
    sedm_filename?: string;
    sedm_filesize?: number;
    sedm_filetype?: string;
    sedm_filelink?: string;
    sedm_modified_date?: Date;
    sedm_secd_id?: number;
}
