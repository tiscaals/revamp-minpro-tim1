import {
  Controller,
  Patch,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles,
  HttpException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateApplyJobsDto } from '../dto/update-user.dto';
import * as fse from 'fs-extra';
import { Multer, diskStorage } from 'multer';
import { ApplyBootcampService } from './applyBootcamp.service';

export function MultiFileInterceptor() {
  return FileFieldsInterceptor(
    [
      { name: 'userphoto', maxCount: 1 },
      { name: 'user_resume', maxCount: 1 },
    ],
    {
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (
            file.mimetype.startsWith('image') ||
            file.originalname.endsWith('.jpg') ||
            file.originalname.endsWith('.jpeg') ||
            file.originalname.endsWith('.png')
          ) {
            cb(null, './images/user-image');
          } else {
            cb(null, './files/user-media');
          }
        },
        filename: async (req, file, cb) => {
          const random = Math.random().toString(36).substring(2, 15);
          const Suffix = file.originalname.trim();
          cb(null, file.fieldname + '-' + random + '-' + Suffix);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|docx|doc)$/)) {
          cb(new HttpException('Invalid file type', 403), false);
        } else {
          cb(null, true);
        }
      },
      limits: {
        fileSize: 2097152,
      },
    },
  );
}

@Controller('apply-bootcamp')
export class ApplyBootcampController {
  constructor(private readonly applyBootcampService: ApplyBootcampService) {}

  @Patch(':id')
  @UseInterceptors(MultiFileInterceptor())
  async applyBootcamp(
    @Param('id') id: string,
    @Body() updateBootcamp: any,
    @UploadedFiles() files: { [fieldname: string]: Express.Multer.File[] },
  ) {
    const images = [files.user_resume?.[0], files.userphoto?.[0]].filter(
      Boolean,
    );
    if (images.length < 2) {
      for (let i = 0; i < images.length; i++) {
        const imagePath = './images/user-image/' + images[i].filename;
        const exist = await fse.pathExists(imagePath);
        if (exist) {
          await fse.remove(imagePath);
        }
      }
      throw new HttpException('Error uploading files', 400);
    }
    updateBootcamp.userphoto = files.userphoto[0].filename;
    updateBootcamp.user_resume = files.user_resume[0].filename;

    return this.applyBootcampService.applyBootcamp(
      parseInt(id),
      updateBootcamp,
    );
  }
}