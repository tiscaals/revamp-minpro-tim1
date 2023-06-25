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
import { AddressServices } from './address.service';
import { AuthGuard } from 'src/midleware/auth-guard';
import { CreateAddressDto } from '../dto/create-user.dto';
import { UpdateAddressDto } from '../dto/update-user.dto';

@Controller('profile-address')
export class AddressController {
  constructor(private readonly addressServices: AddressServices) {}

  @UseGuards(AuthGuard)
  @Get('get-city')
  getCity() {
    return this.addressServices.getCity();
  }

  @UseGuards(AuthGuard)
  @Get('address-type')
  getType() {
    return this.addressServices.getAddressType();
  }

  //Controller For Address
  @UseGuards(AuthGuard)
  @Post('/add-address')
  AddAddress(@Body() createAddressDto: CreateAddressDto) {
    return this.addressServices.addAddress(createAddressDto);
  }

  @UseGuards(AuthGuard)
  @Patch('/update-address/:id')
  UpdateAddress(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressServices.updateAddress(+id, updateAddressDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/remove-address/:id')
  RemoveAddress(@Param('id') id: string) {
    return this.addressServices.removeAddress(+id);
  }
}
