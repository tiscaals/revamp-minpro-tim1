import multer, { diskStorage } from 'multer';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import * as fs from 'fs-extra';
import { UsersService } from './users.service';
import { UpdatePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/midleware/auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';

const fileUploadInterceptor = FileInterceptor('user_photo', {
  storage: diskStorage({
    destination: './public/user-image',
    filename: (req, file, cb) => {
      const date = Date.now();
      cb(null, date + '-' + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /\.(jpg|jpeg|png|gif)$/;

    if (!file.originalname.match(allowedExtensions)) {
      return cb(
        new Error(
          'only image files with JPG, JPEG, PNG or GIF extensions are allowed!',
        ),
        false,
      );
    }

    cb(null, true);
  },
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  GetUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  GetUsersById(@Param('id') id: string) {
    return this.usersService.getUsersById(+id);
  }

  @Patch('/update-profile/:id')
  @UseInterceptors(fileUploadInterceptor)
  UpdateProfile(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateUserDto.user_photo = file.filename;

      if (file.size > 4 * 1024 * 1024) {
        fs.unlinkSync(file.path);
        throw new Error('file size exceeds the maximum limit (4MB)');
      }
    }
    return this.usersService.updateProfile(+id, updateUserDto);
  }

  @Patch('/update-password/:id')
  UpdatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(+id, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
