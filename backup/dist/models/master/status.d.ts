import { Model } from 'sequelize-typescript';
export interface statusAttributes {
    status: string;
    status_modified_date?: Date;
}
export declare class status extends Model<statusAttributes, statusAttributes> implements statusAttributes {
    status: string;
    status_modified_date?: Date;
}
