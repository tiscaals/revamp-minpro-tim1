import { users_address } from 'models/users';
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

export interface address_typeAttributes {
  adty_id?: number;
  adty_name?: string;
  adty_modified_date?: Date;
}

@Table({ tableName: 'address_type', schema: 'master', timestamps: false })
export class address_type
  extends Model<address_typeAttributes, address_typeAttributes>
  implements address_typeAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.address_type_adty_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'address_type_pkey', using: 'btree', unique: true })
  adty_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  @Index({ name: 'address_type_adty_name_key', using: 'btree', unique: true })
  adty_name?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  adty_modified_date?: Date;

  @HasMany(() => users_address, { sourceKey: 'adty_id' })
  users_addresses?: users_address[];
}
