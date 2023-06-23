import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersDtoService } from './users-dto.service';
import { CreateUsersDtoDto } from './dto/create-users-dto.dto';
import { UpdateUsersDtoDto } from './dto/update-users-dto.dto';

@Controller('users-dto')
export class UsersDtoController {
  constructor(private readonly usersDtoService: UsersDtoService) {}

  @Post()
  create(@Body() createUsersDtoDto: CreateUsersDtoDto) {
    return this.usersDtoService.create(createUsersDtoDto);
  }

  @Get('test')
  findAll(@Body() show: any) {
    const search = show.search;
    return this.usersDtoService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersDtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersDtoDto: UpdateUsersDtoDto) {
    return this.usersDtoService.update(+id, updateUsersDtoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersDtoService.remove(+id);
  }
}
