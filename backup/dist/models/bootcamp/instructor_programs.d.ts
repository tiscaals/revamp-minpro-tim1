import { Model } from 'sequelize-typescript';
export interface instructor_programsAttributes {
    inpro_batch_id: number;
    inpro_entity_id: number;
    inpro_emp_entity_id: number;
    inpro_modified_date?: Date;
}
export declare class instructor_programs extends Model<instructor_programsAttributes, instructor_programsAttributes> implements instructor_programsAttributes {
    inpro_batch_id: number;
    inpro_entity_id: number;
    inpro_emp_entity_id: number;
    inpro_modified_date?: Date;
}
