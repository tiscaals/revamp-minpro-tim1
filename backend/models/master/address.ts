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
import { city } from './city';
import { users_address } from 'models/users';

export interface addressAttributes {
  addr_id?: number;
  addr_spatial_location?: object;
  addr_modifed_date?: Date;
  addr_city_id?: number;
  addr_line1?: string;
  addr_line2?: string;
  addr_postal_code?: string;
}

@Table({ tableName: 'address', schema: 'master', timestamps: false })
export class address
  extends Model<addressAttributes, addressAttributes>
  implements addressAttributes
{
  @ForeignKey(() => users_address)
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.address_addr_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'address_pkey', using: 'btree', unique: true })
  addr_id?: number;

  @Column({ allowNull: true, type: DataType.JSON })
  addr_spatial_location?: object;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  addr_modifed_date?: Date;

  @ForeignKey(() => city)
  @Column({ allowNull: true, type: DataType.INTEGER })
  addr_city_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  @Index({ name: 'address_addr_line1_key', using: 'btree', unique: false })
  addr_line1?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  @Index({ name: 'address_addr_line2_key', using: 'btree', unique: false })
  addr_line2?: string;

  @Column({ allowNull: true, type: DataType.STRING(10) })
  @Index({
    name: 'address_addr_postal_code_key',
    using: 'btree',
    unique: false,
  })
  addr_postal_code?: string;

  @BelongsTo(() => users_address)
  users_address?: users_address;

  @BelongsTo(() => city)
  city?: city;
}
