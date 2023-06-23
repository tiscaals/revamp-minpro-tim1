import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseInterceptors, UploadedFiles, UploadedFile, Query } from '@nestjs/common';
import { JobHireService } from './job-hire.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage , Multer } from 'multer'
import { client, job_post } from 'models/job_hire';

const uploadGambar =  FileInterceptor('image', {
  storage: diskStorage({
    destination: './images/job_photo',
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
        console.log("fileName", fileName);
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

  @Get()
  findAllJopo() {
    return this.jobHireService.findAllJopo();
  }

  @Get('search')
  searchJobPost(
    @Query('key') key?: string,
    @Query('loc') loc?: string,
    @Query('job') job?: string,
    @Query('type') type?: any,
    @Query('jobType') jobtype?: any,
    @Query('expe') expe?: any,
    @Query('terupdate') terupdate?: any,
    @Query('newest') newest?: any,
  ) {
    console.log(
      'SEARCH & FILTER',
      key,
      loc,
      job,
      type,
      jobtype,
      expe,
      terupdate,
      newest,
    );
    return this.jobHireService.searchJobPost(
      key || '',
      loc || '',
      job || '',
      type || '',
      jobtype || '',
      expe || '',
      terupdate || '',
      newest || '',
    );
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

  @Patch('status')
  updateStatus(@Body() status: any) {
    return this.jobHireService.updateStatus(status);
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

  // CLIENT ALL ALLLLL
  @Get('client')
  findAllClient() {
    return this.jobHireService.findAllClient();
  }

  @Get('client/:id')
  findOne(@Param('id') id: string) {
    return this.jobHireService.findOneClient(+id);
  }

  @Patch('client/:id')
  updateClient(@Param('id') id: string, @Body() updateJobHireDto: any) {
    return this.jobHireService.updateClient(+id, updateJobHireDto);
  }

  // EMPLOYEE RANGE
  @Get('emprange')
  findEmpRange() {
    return this.jobHireService.findAllEmprange();
  }

  // TALENT
  @Post('talent')
  createTalent(@Body() createTalent: any) {
    return this.jobHireService.createTalent(createTalent)
  }

  @Get('talent')
  findProCandidate() {
    return this.jobHireService.findProCandidate()
  }

  @Patch('talent/:id')
  updateTalent(@Param('id') id:string, @Body() updateTalent: any) {
    return this.jobHireService.updateTalent(+id, updateTalent)
  }
}
