import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreatePlacementDto {
  //   @IsNumber()
  //   @IsNotEmpty()
  emp_entity_id: string;

  //   @IsString()
  // @IsNotEmpty()
  emp_emp_number: string;

  //   @IsString()
  // @IsNotEmpty()
  emp_national_id: string;

  @IsDate()
  @Type(() => Date)
  emp_birth_date: Date;

  @IsString()
  // @IsNotEmpty()
  emp_marital_status: string;

  @IsString()
  // @IsNotEmpty()
  emp_gender: string;

  @IsDate()
  @Type(() => Date)
  emp_hire_date: Date;

  @IsDate()
  @Type(() => Date)
  emp_end_contract: Date;

  @IsString()
  // @IsNotEmpty()
  emp_salaried_flag: string;

  @IsNumber()
  // @IsNotEmpty()
  emp_vacation_hours: number;

  @IsNumber()
  // @IsNotEmpty()
  emp_sickleave_hours: number;

  @IsNumber()
  // @IsNotEmpty()
  emp_current_flag: number;

  @IsString()
  // @IsNotEmpty()
  emp_type: string;

  @IsNumber()
  // @IsNotEmpty()
  emp_joro_id: number;

  @IsNumber()
  // @IsNotEmpty()
  emp_emp_entity_id: number;

  //   @IsNumber()
  // @IsNotEmpty()
  user_role: string;

  @IsNumber()
  // @IsNotEmpty()
  edhi_dept_id: number;

  @IsString()
  ecco_contract_no: string;

  @IsDate()
  @Type(() => Date)
  ecco_contract_date: Date;

  @IsDate()
  @Type(() => Date)
  ecco_start_date: Date;

  @IsDate()
  @Type(() => Date)
  ecco_end_date: Date;

  @IsString()
  ecco_notes: string;

  @IsString()
  ecco_media_link: string;

  @IsNumber()
  ecco_joty_id: number;

  @IsNumber()
  ecco_account_manager: number;

  @IsNumber()
  ecco_clit_id: number;

  @IsString()
  ecco_status: string;
}
