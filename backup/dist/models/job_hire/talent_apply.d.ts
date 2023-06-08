import { Model } from 'sequelize-typescript';
export interface talent_applyAttributes {
    taap_user_entity_id: number;
    taap_entity_id: number;
    taap_intro?: string;
    taap_scoring?: number;
    taap_modified_date?: Date;
    taap_status?: string;
}
export declare class talent_apply extends Model<talent_applyAttributes, talent_applyAttributes> implements talent_applyAttributes {
    taap_user_entity_id: number;
    taap_entity_id: number;
    taap_intro?: string;
    taap_scoring?: number;
    taap_modified_date?: Date;
    taap_status?: string;
}
