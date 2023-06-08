import { Model } from 'sequelize-typescript';
export interface job_post_descAttributes {
    jopo_entity_id: number;
    jopo_description?: object;
    jopo_responsibility?: object;
    jopo_target?: object;
    jopo_benefit?: object;
}
export declare class job_post_desc extends Model<job_post_descAttributes, job_post_descAttributes> implements job_post_descAttributes {
    jopo_entity_id: number;
    jopo_description?: object;
    jopo_responsibility?: object;
    jopo_target?: object;
    jopo_benefit?: object;
}
