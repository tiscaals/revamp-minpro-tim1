import {Multer, diskStorage } from 'multer';
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
import { AuthGuard } from 'src/midleware/auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ProfileService } from './profile.service';

const fileUploadInterceptor = FileInterceptor('user_photo', {
  storage: diskStorage({
    destination: './images/user-image',
    filename: (req, file, cb) => {
      // const date = Date.now();
      // cb(null, date + '-' + file.originalname);
      const random = Math.random().toString(36).substring(2, 15);
      const Suffix = file.originalname.trim();
      cb(null, file.fieldname + '-' + random + '-' + Suffix);
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

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // Controller Update Profile
  @UseGuards(AuthGuard)
  @Patch('/update-profile/:id')
  @UseInterceptors(fileUploadInterceptor)
  UpdateProfile(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Multer.File,
  ) {
    if (file) {
      updateUserDto.user_photo = file.filename;

      if (file.size > 4 * 1024 * 1024) {
        fs.unlinkSync(file.path);
        throw new Error('file size exceeds the maximum limit (4MB)');
      }
    }
    return this.profileService.updateProfile(+id, updateUserDto);
  }
}
