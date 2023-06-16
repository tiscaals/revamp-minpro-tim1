import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { users } from './users';
import { phone_number_type } from './phone_number_type';

export interface users_phonesAttributes {
  uspo_entity_id: number;
  uspo_number: string;
  uspo_modified_date?: Date;
  uspo_ponty_code?: string;
}

@Table({ tableName: 'users_phones', schema: 'users', timestamps: false })
export class users_phones
  extends Model<users_phonesAttributes, users_phonesAttributes>
  implements users_phonesAttributes
{
  @ForeignKey(() => users)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'users_phones_pkey', using: 'btree', unique: true })
  uspo_entity_id!: number;

  @Column({ primaryKey: true, type: DataType.STRING(15) })
  @Index({ name: 'users_phones_pkey', using: 'btree', unique: true })
  uspo_number!: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  uspo_modified_date?: Date;

  @ForeignKey(() => phone_number_type)
  @Column({ allowNull: true, type: DataType.STRING(15) })
  uspo_ponty_code?: string;

  @BelongsTo(() => users)
  user?: users;

  @BelongsTo(() => phone_number_type)
  phone_number_type?: phone_number_type;
}
