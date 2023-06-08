import { Model } from 'sequelize-typescript';
export interface industryAttributes {
    indu_code: string;
    indu_name?: string;
}
export declare class industry extends Model<industryAttributes, industryAttributes> implements industryAttributes {
    indu_code: string;
    indu_name?: string;
}
