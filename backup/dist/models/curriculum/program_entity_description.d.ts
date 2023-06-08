import { Model } from 'sequelize-typescript';
export interface program_entity_descriptionAttributes {
    pred_prog_entity_id: number;
    pred_item_learning?: object;
    pred_item_include?: object;
    pred_requirement?: object;
    pred_description?: object;
    pred_target_level?: object;
}
export declare class program_entity_description extends Model<program_entity_descriptionAttributes, program_entity_descriptionAttributes> implements program_entity_descriptionAttributes {
    pred_prog_entity_id: number;
    pred_item_learning?: object;
    pred_item_include?: object;
    pred_requirement?: object;
    pred_description?: object;
    pred_target_level?: object;
}
