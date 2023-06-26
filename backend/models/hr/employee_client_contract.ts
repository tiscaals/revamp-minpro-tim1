import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface employee_client_contractAttributes {
  ecco_id?: number;
  ecco_entity_id: number;
  ecco_contract_no?: string;
  ecco_contract_date?: Date;
  ecco_start_date?: Date;
  ecco_end_date?: Date;
  ecco_notes?: string;
  ecco_modified_date?: Date;
  ecco_media_link?: string;
  ecco_status?: string;
  ecco_joty_id?: number;
  ecco_account_manager?: number;
  ecco_clit_id?: number;
}

@Table({
  tableName: 'employee_client_contract',
  schema: 'hr',
  timestamps: false,
})
export class employee_client_contract
  extends Model<
    employee_client_contractAttributes,
    employee_client_contractAttributes
  >
  implements employee_client_contractAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('hr.employee_client_contract_ecco_id_seq'::regclass)",
    ),
  })
  @Index({
    name: 'employee_client_contract_pkey',
    using: 'btree',
    unique: true,
  })
  ecco_id?: number;

  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({
    name: 'employee_client_contract_pkey',
    using: 'btree',
    unique: true,
  })
  ecco_entity_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  ecco_contract_no?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal(
      "'2023-06-26 02:57:36.855202+00'::timestamp with time zone",
    ),
  })
  ecco_contract_date?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  ecco_start_date?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  ecco_end_date?: Date;

  @Column({ allowNull: true, type: DataType.STRING(512) })
  ecco_notes?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal(
      "'2023-06-26 02:57:36.855202+00'::timestamp with time zone",
    ),
  })
  ecco_modified_date?: Date;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  ecco_media_link?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  ecco_status?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  ecco_joty_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  ecco_account_manager?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  ecco_clit_id?: number;
}
