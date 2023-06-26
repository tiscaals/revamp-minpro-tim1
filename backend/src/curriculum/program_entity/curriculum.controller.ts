import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  Put,
  UploadedFiles,
} from '@nestjs/common';
import { CreateProgramEntityDto } from './dto/create-program_entity.dto';
import { UpdateProgramEntityDto } from './dto/update-program_entity.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Multer, diskStorage } from 'multer';
import * as crypto from 'crypto';
import { CurriculumService } from './curriculum.service';

@Controller('program-entity')
export class CurriculumController {
  constructor(private readonly programEntityService: CurriculumService) {}

  @Post('sections')
  createSections(@Body() createProgramEntity: any) {
    return this.programEntityService.createSections(createProgramEntity);
  }

  @Get('getMerged')
  MergeSection() {
    return this.programEntityService.MergeSection();
  }
  @Get('getOne/:id')
  findOneCurr(@Param('id') id: string) {
    return this.programEntityService.findOneCurr(+id);
  }

  @Get('getAll/:id')
  findAllTabe(@Param('id') id: string) {
    return this.programEntityService.findAllTabe(+id);
  }

  @Post('create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'image',
        filename: (req, file, callback) => {
          const salt =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          const imageNameWithSalt = file.originalname + salt;
          const md5Hash = crypto
            .createHmac('md5', '1234')
            .update(imageNameWithSalt)
            .digest('base64');
          const filename = `${md5Hash}_${file.originalname}`;
          callback(null, filename);
          // console.log(file.buffer);
        },
      }),
    }),
  )
  create(
    @Body() createProgramEntityDto: any,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpg|jpeg|png',
        })
        .addMaxSizeValidator({
          maxSize: 100000, //dalam kb
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    createProgramEntityDto.image = file.filename;
    console.log(createProgramEntityDto);
    return this.programEntityService.create(createProgramEntityDto);
  }

  @Post('section/:id')
  @UseInterceptors(
    FilesInterceptor('filelink', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          let destination;
          if (
            file.mimetype.startsWith('image') ||
            file.originalname.endsWith('.jpg') ||
            file.originalname.endsWith('.jpeg') ||
            file.originalname.endsWith('.png')
          ) {
            destination = 'image';
          } else if (
            file.mimetype.startsWith('video') ||
            file.originalname.endsWith('.mp4') ||
            file.originalname.endsWith('.avi') ||
            file.originalname.endsWith('.movi')
          ) {
            destination = 'videos';
          } else {
            destination = 'files';
          }
          cb(null, destination);
        },
        filename: (req, file, callback) => {
          const salt =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          const imageNameWithSalt = file.originalname + salt;
          const md5Hash = crypto
            .createHmac('md5', '1234')
            .update(imageNameWithSalt)
            .digest('base64');
          const filename = `${md5Hash}_${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  createSectionsDetail(
    @Param('id') id: string,
    @Body() createProgramEntity: any,
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    files.forEach((file) => {
      createProgramEntity.filelink = file.filename;
    });
    return this.programEntityService.createSectionsDetail(
      +id,
      createProgramEntity,
    );
  }

  @Get('cek')
  findAll(@Body() show: any) {
    // const pagination = show.pagination;
    const search = show.search;
    const filter = show.filter;
    return this.programEntityService.findAll(search, filter);
  }

  @Get('currentNumber')
  findCurrRegNumber() {
    return this.programEntityService.findCurrRegNumber();
  }

  @Put('updateSection/:id')
  updateSection(
    @Param('id') id: string,
    @Body() updateProgramEntityDto: any
    ){
      return this.programEntityService.updateSection(+id, updateProgramEntityDto)
    }

  @Put('updateProgram/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './image',
        filename: (req, file, callback) => {
          const salt =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          const imageNameWithSalt = file.originalname + salt;
          const md5Hash = crypto
            .createHmac('md5', '1234')
            .update(imageNameWithSalt)
            .digest('base64');
          const filename = `${md5Hash}_${file.originalname}`;
          callback(null, filename);
          // console.log(file.buffer);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateProgramEntityDto: any,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpg|jpeg|png|gif|jfif',
        })
        .addMaxSizeValidator({
          maxSize: 100000, //dalam kb
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    updateProgramEntityDto.image = file.filename;
    return this.programEntityService.update(+id, updateProgramEntityDto, file);
  }

  @Patch(':id')
  remove(@Param('id') id: string) {
    return this.programEntityService.remove(+id);
  }
}
