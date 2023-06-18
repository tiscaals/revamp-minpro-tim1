import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseInterceptors, UploadedFiles, UploadedFile, Query } from '@nestjs/common';
import { JobHireService } from './job-hire.service';
import { CreateJobHireDto } from './dto/create-job-hire.dto';
import { UpdateJobHireDto } from './dto/update-job-hire.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage , Multer } from 'multer'
import { client, job_post } from 'models/job_hire';

const uploadGambar =  FileInterceptor('image', {
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

        const randomName = Array(8).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');

        const fileName = `${clit.clit_name}-${randomName}-${file.originalname}`;
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

@Controller('job-hire')
export class JobHireController {
  constructor(private readonly jobHireService: JobHireService) {}

  // JOB POSTING
  @Post()
  @UseInterceptors(uploadGambar)
  createJopo(@Body() createJopo: any, @UploadedFile() image: Multer.File) {
    return this.jobHireService.createJopo(createJopo, image);
  }

  //QUERY
  // @Get()
  // findAllJopo(
  //   @Query('limit') limit: number,
  //   @Query('offset') offset: number,
  //   @Query('keyword') keyword: string,
  //   @Query('location') location: string,
  //   @Query('job_role') job_role: string,
  // ) {
  //   const pagination = { limit, offset };
  //   const search = { keyword, location };
  //   const filter = { job_role }
  //   // console.log(show);
  //   console.log(pagination, search, filter);
  //   // console.log("limit",+show.pagination.limit, "offset", +show.pagination.offset);
  //   return this.jobHireService.findAllJopo(pagination, search, filter);
  // }

  // BODY
  // @Get()
  // findAllJopo(@Body() show:any) {
  //   const pagination = show.pagination;
  //   const search = show.search;
  //   const filter = show.filter;
  //   console.log(show);
  //   console.log(pagination, search, filter);
  //   // console.log("limit",+show.pagination.limit, "offset", +show.pagination.offset);
  //   return this.jobHireService.findAllJopo(pagination, search, filter);
  // }

  // ALL ALLLL
  @Get()
  findAllJopo() {
    return this.jobHireService.findAllJopo();
  }

  @Get('photo')
  findJopho() {
    return this.jobHireService.findJopho();
  }

  @Get('currnum')
  findCurrentNumber() {
    return this.jobHireService.findCurrentNumber();
  }

  @Get('jobdetail')
  findOneJopo(@Query('id') id: string) {
    console.log(id);
    return this.jobHireService.findOneJopo(+id);
  }

  @Patch(':id')
  @UseInterceptors(uploadGambar)
  updateJopo(@Param('id') id: string, @Body() updateJobHireDto: any, @UploadedFile() images: Multer.File) {
    return this.jobHireService.updateJopo(+id, updateJobHireDto, images);
  }

  @Patch('delete/:id')
  removeJopoSoft(@Param('id') id: string) {
    return this.jobHireService.removeJopoSoft(+id);
  }

  // CLIENT
  @Post('client')
  createClient(@Body() createClient: any) {
    return this.jobHireService.createClient(createClient);
  }

  @Get('clientall')
  findClient() {
    return this.jobHireService.findClient();
  }

  @Get('client')
  findAllClient(@Body() show:any) {
    const pagination = show.pagination;
    const search = show.search;
    return this.jobHireService.findAllClient(pagination, search);
  }

  @Patch('client/:id')
  updateClient(@Param('id') id: string, @Body() updateJobHireDto: any) {
    return this.jobHireService.updateClient(+id, updateJobHireDto);
  }

  // TALENT
  @Post('talent')
  createTalent(@Body() createClient: any) {
    return this.jobHireService.createTalent(createClient)
  }
}
