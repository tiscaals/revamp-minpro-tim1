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
import { users_email } from './users_email';
import { users_roles } from './users_roles';
import { users_phones } from './users_phones';
import { users_address } from './users_address';
import { users_education } from './users_education';
import { users_experiences } from './users_experiences';
import { users_skill } from './users_skill';
import { users_media } from './users_media';

export interface usersAttributes {
  user_entity_id: number;
  user_name?: string;
  user_password?: string;
  user_first_name?: string;
  user_last_name?: string;
  user_birth_date?: string;
  user_email_promotion?: number;
  user_demographic?: object;
  user_modified_date?: Date;
  user_photo?: string;
  user_current_role?: number;
}

@Table({ tableName: 'users', schema: 'users', timestamps: false })
export class users
  extends Model<usersAttributes, usersAttributes>
  implements usersAttributes
{
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'users_pkey', using: 'btree', unique: true })
  user_entity_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  @Index({ name: 'users_user_name_key', using: 'btree', unique: true })
  user_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(256) })
  user_password?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  user_first_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  user_last_name?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  user_birth_date?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal('0'),
  })
  user_email_promotion?: number;

  @Column({ allowNull: true, type: DataType.JSON })
  user_demographic?: object;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  user_modified_date?: Date;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  user_photo?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  user_current_role?: number;

  @HasMany(() => users_email, { sourceKey: 'user_entity_id' })
  users_emails?: users_email[];

  @HasMany(() => users_roles, { sourceKey: 'user_entity_id' })
  users_roles?: users_roles[];

  @HasMany(() => users_phones, { sourceKey: 'user_entity_id' })
  users_phones?: users_phones[];

  @HasMany(() => users_address, { sourceKey: 'user_entity_id' })
  users_addresses?: users_address[];

  @HasMany(() => users_education, { sourceKey: 'user_entity_id' })
  users_educations?: users_education[];

  @HasMany(() => users_experiences, { sourceKey: 'user_entity_id' })
  users_experiences?: users_experiences[];

  @HasMany(() => users_skill, { sourceKey: 'user_entity_id' })
  users_skills?: users_skill[];

  @HasMany(() => users_media, { sourceKey: 'user_entity_id' })
  users_medias?: users_media[];
}
