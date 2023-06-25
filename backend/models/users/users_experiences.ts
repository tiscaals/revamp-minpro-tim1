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
import { city } from 'models/master';

export interface users_experiencesAttributes {
  usex_id?: number;
  usex_entity_id: number;
  usex_title?: string;
  usex_profile_headline?: string;
  usex_employment_type?: string;
  usex_company_name?: string;
  usex_is_current?: string;
  usex_start_date?: string;
  usex_end_date?: string;
  usex_industry?: string;
  usex_description?: string;
  usex_experience_type?: string;
  usex_city_id?: number;
}

@Table({ tableName: 'users_experiences', schema: 'users', timestamps: false })
export class users_experiences
  extends Model<users_experiencesAttributes, users_experiencesAttributes>
  implements users_experiencesAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('users.users_experiences_usex_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'users_experiences_pkey', using: 'btree', unique: true })
  @Index({
    name: 'users_experiences_usex_id_key',
    using: 'btree',
    unique: true,
  })
  usex_id?: number;

  @ForeignKey(() => users)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'users_experiences_pkey', using: 'btree', unique: true })
  usex_entity_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  usex_title?: string;

  @Column({ allowNull: true, type: DataType.STRING(512) })
  usex_profile_headline?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  usex_employment_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  usex_company_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(10) })
  usex_is_current?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  usex_start_date?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  usex_end_date?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  usex_industry?: string;

  @Column({ allowNull: true, type: DataType.STRING(512) })
  usex_description?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  usex_experience_type?: string;

  @ForeignKey(() => city)
  @Column({ allowNull: true, type: DataType.INTEGER })
  usex_city_id?: number;

  @BelongsTo(() => users)
  user?: users;

  @BelongsTo(() => city)
  city?: city;
}
