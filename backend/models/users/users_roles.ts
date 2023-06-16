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
import { roles } from './roles';

export interface users_rolesAttributes {
  usro_entity_id: number;
  usro_role_id: number;
  usro_modified_date?: Date;
}

@Table({ tableName: 'users_roles', schema: 'users', timestamps: false })
export class users_roles
  extends Model<users_rolesAttributes, users_rolesAttributes>
  implements users_rolesAttributes
{
  @ForeignKey(() => users)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'users_roles_pkey', using: 'btree', unique: true })
  usro_entity_id!: number;

  @ForeignKey(() => roles)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'users_roles_pkey', using: 'btree', unique: true })
  usro_role_id!: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  usro_modified_date?: Date;

  @BelongsTo(() => users)
  user?: users;

  @BelongsTo(() => roles)
  role?: roles;
}
