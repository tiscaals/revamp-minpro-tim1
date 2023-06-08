import { Model } from 'sequelize-typescript';
export interface categoryAttributes {
    cate_id?: number;
    cate_name?: string;
    cate_cate_id?: number;
    cate_modified_date?: Date;
}
export declare class category extends Model<categoryAttributes, categoryAttributes> implements categoryAttributes {
    cate_id?: number;
    cate_name?: string;
    cate_cate_id?: number;
    cate_modified_date?: Date;
}
