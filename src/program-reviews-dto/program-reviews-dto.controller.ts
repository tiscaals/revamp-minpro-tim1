import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramReviewsDtoService } from './program-reviews-dto.service';
import { CreateProgramReviewsDtoDto } from './dto/create-program-reviews-dto.dto';
import { UpdateProgramReviewsDtoDto } from './dto/update-program-reviews-dto.dto';
import { program_reviews } from 'models_curriculum';

@Controller('program-reviews-dto')
export class ProgramReviewsDtoController {
  constructor(private readonly programReviewsDtoService: ProgramReviewsDtoService) {}

  @Post('cek')
  create(@Body() createProgramReviewsDtoDto: program_reviews) : Promise<any>{
    return this.programReviewsDtoService.create(createProgramReviewsDtoDto);
  }

  @Get()
  findAll() {
    return this.programReviewsDtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programReviewsDtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramReviewsDtoDto: UpdateProgramReviewsDtoDto) {
    return this.programReviewsDtoService.update(+id, updateProgramReviewsDtoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programReviewsDtoService.remove(+id);
  }
}
