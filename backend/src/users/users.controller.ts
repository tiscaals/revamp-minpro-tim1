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
import { UsersService } from './users.service';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { AdminGuard, AuthGuard } from 'src/midleware/auth-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Controller Get Users
  @UseGuards(AdminGuard)
  @Get()
  GetUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  GetUsersById(@Param('id') id: string) {
    return this.usersService.getUsersById(+id);
  }

  //Controller Profile Edit Password
  @UseGuards(AuthGuard)
  @Patch('/update-password/:id')
  UpdatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(+id, updatePasswordDto);
  }
}
