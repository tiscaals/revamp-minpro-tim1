import { Model } from 'sequelize-typescript';
export interface batchAttributes {
    batch_id?: number;
    batch_entity_id: number;
    batch_name?: string;
    batch_description?: string;
    batch_start_date?: string;
    batch_end_date?: string;
    batch_reason?: string;
    batch_type?: string;
    batch_modified_date?: Date;
    batch_status?: string;
    batch_pic_id?: number;
}
export declare class batch extends Model<batchAttributes, batchAttributes> implements batchAttributes {
    batch_id?: number;
    batch_entity_id: number;
    batch_name?: string;
    batch_description?: string;
    batch_start_date?: string;
    batch_end_date?: string;
    batch_reason?: string;
    batch_type?: string;
    batch_modified_date?: Date;
    batch_status?: string;
    batch_pic_id?: number;
}
