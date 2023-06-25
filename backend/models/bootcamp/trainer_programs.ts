import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface trainer_programsAttributes {
  batch_id: number;
  tpro_entity_id?: number;
  tpro_emp_entity_id: number;
  tpro_modified_date?: Date;
}

@Table({ tableName: 'trainer_programs', schema: 'bootcamp', timestamps: false })
export class trainer_programs
  extends Model<trainer_programsAttributes, trainer_programsAttributes>
  implements trainer_programsAttributes
{
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'trainer_programs_pkey', using: 'btree', unique: true })
  batch_id!: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  tpro_entity_id?: number;

  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'trainer_programs_pkey', using: 'btree', unique: true })
  tpro_emp_entity_id!: number;

  @Column({ allowNull: true, type: DataType.DATE })
  tpro_modified_date?: Date;
}
