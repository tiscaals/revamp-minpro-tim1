import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post('insert-cart')
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.insertCartItem(createSaleDto);
  }

  @Post('insert-special-offer')
  createSpecialOfferdanPrograms(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.insertSpecialOfferAndPrograms(createSaleDto);
  }

  @Post('insert-order-detail')
  createOrderDetail(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.insertSalesOrder(createSaleDto);
  }

  @Get('order-detail')
  findAll() {
    return this.salesService.findAllOrderDetail();
  }

  @Get('view-cart')
  findAllCart() {
    return this.salesService.viewCartItems();
  }

  @Get('order-header')
  findAllOrderHeader() {
    return this.salesService.findAllOrderHeader();
  }
  @Get('cart-items')
  findAllCartItems() {
    return this.salesService.findAllCartItems();
  }
  @Get('special-offer')
  findAllSpecialOffer() {
    return this.salesService.findAllSpecialOffer();
  }
  @Get('special-programs')
  findAllSpecialOfferPrograms() {
    return this.salesService.findAllSpecialOfferPrograms();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Put('update-cart/:id')
  updateCartItems(@Param('id') id: number, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.updateCartItemById(id, updateSaleDto);
  }

  @Put('update-order-header')
  updateOrderHeader(@Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.updateOrderDetailHeader(updateSaleDto);
  }

  @Put('update-special-offer')
  updateSpecialOfferPrograms(@Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.updateSpecialOfferAndPrograms(updateSaleDto);
  }

  @Delete('delete-cart/:id')
  deleteCartItem(@Param('id') id: string) {
    return this.salesService.deleteCartItemById(+id);
  }

  @Delete('delete-cart-sp/:id')
  deleteCartItemSP(@Param('id') id: string) {
    return this.salesService.deleteCartItemSP(+id);
  }

  @Delete('hapus-cart/:id')
  hapusCartItems(@Param('id') id: string) {
    return this.salesService.hapusCartItem(id);
  }

  @Delete('delete-order/:id')
  deleteOrder(@Param('id') id: number) {
    return this.salesService.deleteOrderById(+id);
  }

  @Delete('delete-special-offer/:id')
  deleteSpecialOffer(@Param('id') id: number) {
    return this.salesService.deleteSpecialOfferById(+id);
  }
}
