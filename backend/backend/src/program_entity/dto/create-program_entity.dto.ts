import { IsNotEmpty } from 'class-validator';

export class CreateProgramEntityDto {
  @IsNotEmpty()
  headline: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  learning_type: string;
  @IsNotEmpty()
  total_trainee: number;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  price: string;
  @IsNotEmpty()
  language: string;
  @IsNotEmpty()
  duration: number;
  @IsNotEmpty()
  duration_type: string;
  @IsNotEmpty()
  tag_skill: string;
  @IsNotEmpty()
  city_id: number;
  @IsNotEmpty()
  cate_id: number;
  @IsNotEmpty()
  created_by: number;
  @IsNotEmpty()
  status: string;
  @IsNotEmpty()
  payment_type: string;
  @IsNotEmpty()
  total_batch: number;
  @IsNotEmpty()
  prog_score:number;
  @IsNotEmpty()
  prog_curr_regis:string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  item_learning: string;
  @IsNotEmpty()
  item_include: string;
  @IsNotEmpty()
  requirement: string;
  @IsNotEmpty()
  target_level: string;
  @IsNotEmpty()
  titleSection: string;
  @IsNotEmpty()
  descriptionSections: string;
  
  total_section: number;
  total_lecture: number;
  total_minute:number;
  @IsNotEmpty()
  titleDetail:string;
  @IsNotEmpty()
  preview:string;
  @IsNotEmpty()
  note:string;
  @IsNotEmpty()
  minutes:number;
  @IsNotEmpty()
  filename:string;
  @IsNotEmpty()
  filesize:number;
  @IsNotEmpty()
  filetype:string;
  @IsNotEmpty()
  filelink:string;
}
