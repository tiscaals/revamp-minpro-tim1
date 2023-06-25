import { Controller, Get, Post, Body, Patch, Param, Delete, ParseFilePipe, FileTypeValidator, UseInterceptors, UploadedFile } from '@nestjs/common';
import { HrDtoService } from './hr-dto.service';
import { CreateHrDtoDto } from './dto/create-hr-dto.dto';
import { UpdateHrDtoDto } from './dto/update-hr-dto.dto';
import { diskStorage } from 'multer';
import * as crypto from 'crypto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';


const multerConfig = {
  storage: diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${process.cwd()}/user_photo`)
    },
    filename: (req, file, callback) => {
      const salt =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const imageNameWithSalt = file.originalname + salt;
      const md5Hash = crypto.createHmac("md5", '1234').update(imageNameWithSalt).digest('base64')
      const filename = `${md5Hash}_${file.originalname}`;
      callback(null, filename)
    }
  })
}
const validateImage = new ParseFilePipe({
  validators: [new FileTypeValidator({
    fileType: '.(png|jpg|jpeg|svg)',
  })]
  , fileIsRequired: false
})

@Controller('hr-dto')
export class HrDtoController {
  constructor(private readonly hrDtoService: HrDtoService) {}

  // @Post('halo')
  // create(@Body() createHrDtoDto: any) {
  //   return this.hrDtoService.create(createHrDtoDto);
  // }

  
   @Patch('/halo/:id')
    @UseInterceptors(FileInterceptor('user_photo', multerConfig))
    updateProfile(@Param('id') id: string, @Body() updateProfileDto: any,
      @UploadedFile(validateImage) file?: Express.Multer.File
    ) {
  
      try {
        if (file) {
          updateProfileDto.user_photo = file.filename
        }
        return this.hrDtoService.editProfile(+id, updateProfileDto, file);
      } catch (error) {
        if (file) {
          fs.unlinkSync(file.path)
        }
        return error.message
      }
    }

  @Get('cek')
  findAll() {
    return this.hrDtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrDtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHrDtoDto: UpdateHrDtoDto) {
    return this.hrDtoService.update(+id, updateHrDtoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hrDtoService.remove(+id);
  }
}
