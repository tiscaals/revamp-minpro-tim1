import multer, { diskStorage } from 'multer';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/midleware/auth-guard';
import { CreateEmailDto } from '../dto/create-user.dto';
import { UpdateEmailDto } from '../dto/update-user.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  //Controller Profile Email
  @UseGuards(AuthGuard)
  @Post('/add-email')
  AddEmail(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.addEmailProfile(createEmailDto);
  }

  @UseGuards(AuthGuard)
  @Patch('/update-email/:id')
  UpdateEmail(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.emailService.updateEmailProfile(+id, updateEmailDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/remove-email/:id')
  RemoveEmailProfile(@Param('id') id: string) {
    return this.emailService.removeEmailProfile(+id);
  }
}
