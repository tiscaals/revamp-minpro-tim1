import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface talentsAttributes {
  talent_id?: number;
  talent_fullname?: string;
  talent_user_entity_id?: number;
  talent_technology?: string;
  talent_batch_id?: number;
  talent_start_date?: string;
  talent_end_date?: string;
  talent_trainer?: string;
  talent_skill?: string;
  talent_image?: string;
  talent_status?: string;
}

@Table({ tableName: 'talents', schema: 'bootcamp', timestamps: false })
export class talents
  extends Model<talentsAttributes, talentsAttributes>
  implements talentsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('bootcamp.talents_talent_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'talents_pkey', using: 'btree', unique: true })
  talent_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  talent_fullname?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  talent_user_entity_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(256) })
  talent_technology?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  talent_batch_id?: number;

  @Column({ allowNull: true, type: DataType.STRING })
  talent_start_date?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  talent_end_date?: string;

  @Column({ allowNull: true, type: DataType.STRING(30) })
  talent_trainer?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  talent_skill?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  talent_image?: string;

  @Column({ allowNull: true, type: DataType.STRING(20) })
  talent_status?: string;
}
