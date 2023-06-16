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
import { CreatePhoneNumberDto } from '../dto/create-user.dto';
import { UpdatePhoneNumberDto } from '../dto/update-user.dto';
import { PhoneService } from './phone.service';

@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  // Controller Profile Phone Number
  @UseGuards(AuthGuard)
  @Post('/add-phone')
  AddPhoneNumber(@Body() createPhoneNumberDto: CreatePhoneNumberDto) {
    return this.phoneService.addNumberPhone(createPhoneNumberDto);
  }

  @UseGuards(AuthGuard)
  @Patch('/update-phone/:phone_number')
  UpdatePhoneNumber(
    @Param('phone_number') phone_number: any,
    @Body() updatePhoneNumberDto: UpdatePhoneNumberDto,
  ) {
    return this.phoneService.updateNumberPhone(
      phone_number,
      updatePhoneNumberDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/remove-phone/:phone_number')
  RemovePhoneNumber(@Param('phone_number') phone_number: string) {
    return this.phoneService.removeNumberPhone(phone_number);
  }
}
