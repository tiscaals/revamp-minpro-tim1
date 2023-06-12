import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { JobHireService } from './job-hire.service';
import { CreateJobHireDto } from './dto/create-job-hire.dto';
import { UpdateJobHireDto } from './dto/update-job-hire.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage , Multer } from 'multer'
import { client, job_post } from 'models/job_hire';

export function uploadGambar(): ReturnType<typeof FileInterceptor> {
  return FileInterceptor('image', {
    storage: diskStorage({
      destination: './images',
      filename: async (req, file, cb) => {
        try {
          const clitId = req.body.jopo_clit_id;
          const clit = await client.findOne({
            where: {
              clit_id: clitId,
            },
            attributes: ['clit_name'],
          });

          if (!clit) {
            throw new Error('Client not found');
          }

          const fileName = `${clit.clit_name}-${file.originalname}`;
          cb(null, fileName);
        } catch (error) {
          cb(error);
        }
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new HttpException('File hanya boleh file gambar!', HttpStatus.FORBIDDEN), false);
      }
      cb(null, true);
    },
  });
}


@Controller('job-hire')
export class JobHireController {
  constructor(private readonly jobHireService: JobHireService) {}

  @Post()
  @UseInterceptors(uploadGambar())
  createJopo(@Body() createJopo: any, @UploadedFile() image: Multer.File) {
    return this.jobHireService.createJopo(createJopo, image);
  }

  @Get()
  findAll(@Body() show:any) {
    const pagination = show.pagination;
    const search = show.search;
    const filter = show.filter;
    // console.log("limit",+show.pagination.limit, "offset", +show.pagination.offset);
    return this.jobHireService.findAllJopo(pagination, search, filter);
  }

  @Get('currnum')
  findCurrentNumber() {
    return this.jobHireService.findCurrentNumber();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobHireService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(uploadGambar())
  updateJopo(@Param('id') id: string, @Body() updateJobHireDto: any, @UploadedFile() images: Multer.File) {
    return this.jobHireService.updateJopo(+id, updateJobHireDto, images);
  }

  @Delete(':id')
  removeJopo(@Param('id') id: string) {
    return this.jobHireService.removeJopo(+id);
  }
}
