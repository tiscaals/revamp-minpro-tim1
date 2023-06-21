import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MasterService } from './master.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';

@Controller('master')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Post()
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.masterService.create(createMasterDto);
  }

  @Get('edu')
  findEducation() {
    return this.masterService.findEducation();
  }

  @Get('worktype')
  findWorktype() {
    return this.masterService.findWorktype();
  }

  @Get('jobrole')
  findJobrole() {
    return this.masterService.findJobrole();
  }

  @Get('industry')
  findIndustry() {
    return this.masterService.findIndustry();
  }

  @Get('city')
  findCity() {
    return this.masterService.findCity();
  }

  @Get('roac')
  findRouteAction() {
    return this.masterService.findRouteAction();
  }
}
