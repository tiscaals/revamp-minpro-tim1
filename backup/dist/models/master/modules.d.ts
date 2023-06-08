import { Model } from 'sequelize-typescript';
export interface modulesAttributes {
    module_name: string;
}
export declare class modules extends Model<modulesAttributes, modulesAttributes> implements modulesAttributes {
    module_name: string;
}
