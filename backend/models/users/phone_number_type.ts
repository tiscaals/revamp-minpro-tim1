import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { users_phones } from './users_phones';

export interface phone_number_typeAttributes {
  ponty_code: string;
  ponty_modified_date?: Date;
}

@Table({ tableName: 'phone_number_type', schema: 'users', timestamps: false })
export class phone_number_type
  extends Model<phone_number_typeAttributes, phone_number_typeAttributes>
  implements phone_number_typeAttributes
{
  @Column({ primaryKey: true, type: DataType.STRING(15) })
  @Index({ name: 'phone_number_type_pkey', using: 'btree', unique: true })
  ponty_code!: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  ponty_modified_date?: Date;

  @HasMany(() => users_phones, { sourceKey: 'ponty_code' })
  users_phones?: users_phones[];
}
