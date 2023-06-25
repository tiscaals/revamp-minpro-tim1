import { Injectable } from '@nestjs/common';
import { CreateProgramReviewsDtoDto } from './dto/create-program-reviews-dto.dto';
import { UpdateProgramReviewsDtoDto } from './dto/update-program-reviews-dto.dto';
import { program_reviews } from 'models_curriculum';
import { Sequelize } from 'sequelize';

@Injectable()
export class ProgramReviewsDtoService {
  // constructor(private sequelize: Sequelize) {}
  async create(createProgramReviewsDtoDto: program_reviews):Promise<any> {
    try {
      console.log(createProgramReviewsDtoDto);
      const result = await program_reviews.create({
        prow_user_entity_id: createProgramReviewsDtoDto.prow_user_entity_id,
        prow_prog_entity_id: createProgramReviewsDtoDto.prow_prog_entity_id,
        prow_review: createProgramReviewsDtoDto.prow_review,
        prow_rating: createProgramReviewsDtoDto.prow_rating
      });
      // const result = await this.sequelize.query(`INSERT INTO program_reviews VALUES(${createProgramReviewsDtoDto})`)
      // console.log(result);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  findAll() {
    return `This action returns all programReviewsDto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} programReviewsDto`;
  }

  update(id: number, updateProgramReviewsDtoDto: UpdateProgramReviewsDtoDto) {
    return `This acreateProgramReviewsDtoDtoeviewsDto`;
  }

  remove(id: number) {
    return `This action removes a #${id} programReviewsDto`;
  }
}
