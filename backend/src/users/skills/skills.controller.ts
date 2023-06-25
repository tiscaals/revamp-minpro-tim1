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
import { CreateEmailDto, CreateSkillsDto } from '../dto/create-user.dto';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  //Controller Profile Email
  @UseGuards(AuthGuard)
  @Get('/get-skills')
  getSkill() {
    return this.skillsService.getSkill();
  }

  @UseGuards(AuthGuard)
  @Post('/add-skills')
  AddSkills(@Body() createSkillsDto: CreateSkillsDto) {
    return this.skillsService.addSkills(createSkillsDto);
  }

  @Delete('/remove-skills/:id')
  DeleteSkill(@Param('id') id: string) {
    return this.skillsService.removeSkill(+id);
  }
}
