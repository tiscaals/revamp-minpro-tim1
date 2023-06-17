import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EducationServices } from './education.service';
import { AuthGuard } from 'src/midleware/auth-guard';
import { CreateEducationDto } from '../dto/create-user.dto';
import { UpdateEducationDto } from '../dto/update-user.dto';

@Controller('education')
export class EducationController {
  constructor(private readonly educationServices: EducationServices) {}

  @UseGuards(AuthGuard)
  @Post('/add-education')
  addEducation(@Body() createEducationDto: CreateEducationDto) {
    return this.educationServices.addEducation(createEducationDto);
  }

  @UseGuards(AuthGuard)
  @Patch('/update-education/:id')
  updateEducation(
    @Param('id') id: string,
    @Body() updateEducationDto: UpdateEducationDto,
  ) {
    return this.educationServices.updateEducation(+id, updateEducationDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/remove-education/:id')
  removeEducation(@Param('id') id: string) {
    return this.educationServices.removeEducation(+id);
  }
}
