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

export interface users_mediaAttributes {
  usme_id?: number;
  usme_entity_id: number;
  usme_file_link?: string;
  usme_filename?: string;
  usme_filetype?: string;
  usme_note?: string;
  usme_modified_data?: Date;
  usme_filesize?: number;
}

@Table({ tableName: 'users_media', schema: 'users', timestamps: false })
export class users_media
  extends Model<users_mediaAttributes, users_mediaAttributes>
  implements users_mediaAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('users.users_media_usme_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'users_media_pkey', using: 'btree', unique: true })
  usme_id?: number;

  @ForeignKey(() => users)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'users_media_pkey', using: 'btree', unique: true })
  usme_entity_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  usme_file_link?: string;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  usme_filename?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  usme_filetype?: string;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  usme_note?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  usme_modified_data?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  usme_filesize?: number;

  @BelongsTo(() => users)
  user?: users;
}
