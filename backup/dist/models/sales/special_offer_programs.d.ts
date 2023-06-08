import { Model } from 'sequelize-typescript';
export interface special_offer_programsAttributes {
    soco_id?: number;
    soco_spof_id: number;
    soco_prog_entity_id: number;
    soco_status?: string;
    soco_modified_date?: Date;
}
export declare class special_offer_programs extends Model<special_offer_programsAttributes, special_offer_programsAttributes> implements special_offer_programsAttributes {
    soco_id?: number;
    soco_spof_id: number;
    soco_prog_entity_id: number;
    soco_status?: string;
    soco_modified_date?: Date;
}
