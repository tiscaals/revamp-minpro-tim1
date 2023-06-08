import { Model } from 'sequelize-typescript';
export interface sectionsAttributes {
    sect_id?: number;
    sect_prog_entity_id: number;
    sect_title?: string;
    sect_description?: string;
    sect_total_section?: number;
    sect_total_lecture?: number;
    sect_total_minute?: number;
    sect_modified_date?: Date;
}
export declare class sections extends Model<sectionsAttributes, sectionsAttributes> implements sectionsAttributes {
    sect_id?: number;
    sect_prog_entity_id: number;
    sect_title?: string;
    sect_description?: string;
    sect_total_section?: number;
    sect_total_lecture?: number;
    sect_total_minute?: number;
    sect_modified_date?: Date;
}
