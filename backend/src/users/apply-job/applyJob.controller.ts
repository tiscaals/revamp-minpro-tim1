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
import { AuthGuard } from 'src/midleware/auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApplyJobService } from './applyJob.service';

const fileUploadInterceptor = FileInterceptor('user_photo', {
  storage: diskStorage({
    destination: './images/user-image',
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

@Controller('apply-job')
export class ApplyJobController {
  constructor(private readonly applyJobService: ApplyJobService) {}
}
