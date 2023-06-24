import {
  Controller,
  Patch,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApplyJobService } from './applyJob.service';
import { UpdateApplyJobsDto } from '../dto/update-user.dto';
import * as fse from 'fs-extra';
import { diskStorage } from 'multer';

export function MultiFileInterceptor() {
  return FileFieldsInterceptor(
    [
      { name: 'userphoto', maxCount: 1 },
      { name: 'usmed_filename', maxCount: 1 },
    ],
    {
      storage: diskStorage({
        destination: (req, file, cb) => {
          console.log(file.mimetype);
          console.log(file.originalname.endsWith('.jpg'));
          if (
            file.mimetype.startsWith('image') ||
            file.originalname.endsWith('.jpg') ||
            file.originalname.endsWith('.jpeg') ||
            file.originalname.endsWith('.png')
          ) {
            cb(null, './images/user-image');
          } else {
            cb(null, './media/user-media');
          }
        },
        filename: async (req, file, cb) => {
          const random =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          const Suffix = file.originalname.trim();
          console.log(file);
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

@Controller('apply-job')
export class ApplyJobController {
  constructor(private readonly applyJobService: ApplyJobService) {}

  @Patch(':id')
  @UseInterceptors(MultiFileInterceptor())
  async applyJobs(
    @Param('id') id: string,
    @Body() updateApplyJobsDto: UpdateApplyJobsDto,
    @UploadedFile() files: { [fieldname: string]: Express.Multer.File[] },
  ) {
    const images = [files.usmed_filename?.[0], files.userphoto?.[0]].filter(
      Boolean,
    );
    if (images.length < 2) {
      for (let i = 0; i < images.length; i++) {
        const imagePath = './images/user-image/' + images[i].filename;
        const exist = await fse.pathExists(imagePath); // Gunakan await untuk memastikan pengecekan selesai
        if (exist) {
          await fse.remove(imagePath); // Gunakan await untuk memastikan penghapusan selesai
        }
      }
      throw new HttpException('Error uploading files', 400); // Ganti return dengan throw new HttpException
    }
    return this.applyJobService.applyJobs(parseInt(id), updateApplyJobsDto); // Ganti + dengan parseInt
  }
}
