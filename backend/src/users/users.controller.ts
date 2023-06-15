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
import {
  UpdateEmailDto,
  UpdatePasswordDto,
  UpdatePhoneNumberDto,
  UpdateUserDto,
} from './dto/update-user.dto';
import { AuthGuard } from 'src/midleware/auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEmailDto, CreatePhoneNumberDto } from './dto/create-user.dto';
import { phone_number_type } from 'models';

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

  //Controller Get Users
  @UseGuards(AuthGuard)
  @Get()
  GetUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  GetUsersById(@Param('id') id: string) {
    return this.usersService.getUsersById(+id);
  }

  // Controller Update Profile
  @UseGuards(AuthGuard)
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

  //Controller Profile Edit Password
  @UseGuards(AuthGuard)
  @Patch('/update-password/:id')
  UpdatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(+id, updatePasswordDto);
  }

  //Controller Profile Email
  @UseGuards(AuthGuard)
  @Post('/add-email')
  AddEmail(@Body() createEmailDto: CreateEmailDto) {
    return this.usersService.addEmailProfile(createEmailDto);
  }

  @UseGuards(AuthGuard)
  @Patch('/update-email/:id')
  UpdateEmail(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.usersService.updateEmailProfile(+id, updateEmailDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/remove-email/:id')
  RemoveEmailProfile(@Param('id') id: string) {
    return this.usersService.removeEmailProfile(+id);
  }

  // Controller Profile Phone Number
  @UseGuards(AuthGuard)
  @Post('/add-phone')
  AddPhoneNumber(@Body() createPhoneNumberDto: CreatePhoneNumberDto) {
    return this.usersService.addNumberPhone(createPhoneNumberDto);
  }

  @UseGuards(AuthGuard)
  @Patch('/update-phone/:phone_number')
  UpdatePhoneNumber(
    @Param('phone_number') phone_number: any,
    @Body() updatePhoneNumberDto: UpdatePhoneNumberDto,
  ) {
    return this.usersService.updateNumberPhone(
      phone_number,
      updatePhoneNumberDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/remove-phone/:phone_number')
  RemovePhoneNumber(@Param('phone_number') phone_number: string) {
    return this.usersService.removeNumberPhone(phone_number);
  }
}
