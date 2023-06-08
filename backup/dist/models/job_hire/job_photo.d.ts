import { Model } from 'sequelize-typescript';
export interface job_photoAttributes {
    jopho_id?: number;
    jopho_filename?: string;
    jopho_filesize?: number;
    jopho_filetype?: string;
    jopho_modified_date?: Date;
    jopho_entity_id?: number;
}
export declare class job_photo extends Model<job_photoAttributes, job_photoAttributes> implements job_photoAttributes {
    jopho_id?: number;
    jopho_filename?: string;
    jopho_filesize?: number;
    jopho_filetype?: string;
    jopho_modified_date?: Date;
    jopho_entity_id?: number;
}
