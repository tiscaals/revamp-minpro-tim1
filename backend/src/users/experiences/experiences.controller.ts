import multer, { diskStorage } from 'multer';
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
import { AuthGuard } from 'src/midleware/auth-guard';
import { ExperiencesService } from './experiences.service';
import { CreateExperiencesDto } from '../dto/create-user.dto';
import { UpdateExperiencesDto } from '../dto/update-user.dto';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experienceService: ExperiencesService) {}

  //Controller Profile Experiences

  @UseGuards(AuthGuard)
  @Post('/add-experiences')
  addExperiences(@Body() createExperiencesDto: CreateExperiencesDto) {
    return this.experienceService.addExperiences(createExperiencesDto);
  }

  @UseGuards(AuthGuard)
  @Patch('/edit-experiences/:id')
  updateExperiences(
    @Param('id') id: string,
    @Body() updateExperiencesDto: UpdateExperiencesDto,
  ) {
    return this.experienceService.updateExperiences(+id, updateExperiencesDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/remove-experiences/:id')
  removeExperiences(@Param('id') id: string) {
    return this.experienceService.removeExperiences(+id);
  }
}
