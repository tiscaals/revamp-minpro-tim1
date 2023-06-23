import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramReviewsDtoDto } from './create-program-reviews-dto.dto';

export class UpdateProgramReviewsDtoDto extends PartialType(CreateProgramReviewsDtoDto) {}
