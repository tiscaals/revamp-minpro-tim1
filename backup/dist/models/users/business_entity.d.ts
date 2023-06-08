import { Model } from 'sequelize-typescript';
export interface business_entityAttributes {
    entity_id?: number;
}
export declare class business_entity extends Model<business_entityAttributes, business_entityAttributes> implements business_entityAttributes {
    entity_id?: number;
}
