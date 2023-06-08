import { Model } from 'sequelize-typescript';
export interface skill_typeAttributes {
    skty_name: string;
}
export declare class skill_type extends Model<skill_typeAttributes, skill_typeAttributes> implements skill_typeAttributes {
    skty_name: string;
}
