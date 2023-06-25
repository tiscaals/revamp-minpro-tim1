import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import { users } from './users';
import { address_type, address } from 'models/master';

export interface users_addressAttributes {
  etad_addr_id: number;
  etad_modified_date?: Date;
  etad_entity_id?: number;
  etad_adty_id?: number;
}

@Table({ tableName: 'users_address', schema: 'users', timestamps: false })
export class users_address
  extends Model<users_addressAttributes, users_addressAttributes>
  implements users_addressAttributes
{
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'users_address_pkey', using: 'btree', unique: true })
  etad_addr_id!: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  etad_modified_date?: Date;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  etad_entity_id?: number;

  @ForeignKey(() => address_type)
  @Column({ allowNull: true, type: DataType.INTEGER })
  etad_adty_id?: number;

  @HasOne(() => address, { sourceKey: 'etad_addr_id' })
  address?: address;

  @BelongsTo(() => address_type)
  address_type?: address_type;

  @BelongsTo(() => users)
  user?: users;
}
