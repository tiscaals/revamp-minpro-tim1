import { Model } from 'sequelize-typescript';
export interface educationAttributes {
    edu_code: string;
    edu_name?: string;
}
export declare class education extends Model<educationAttributes, educationAttributes> implements educationAttributes {
    edu_code: string;
    edu_name?: string;
}
