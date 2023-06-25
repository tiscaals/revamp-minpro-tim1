import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RouteActionsService } from './route_actions.service';
import { CreateRouteActionDto } from './dto/create-route_action.dto';
import { UpdateRouteActionDto } from './dto/update-route_action.dto';
import { UpdateDisplayDto } from './dto/update-display';

@Controller('route-actions')
export class RouteActionsController {
  constructor(private readonly routeActionsService: RouteActionsService) {}

  @Post()
  create(@Body() createRouteActionDto: CreateRouteActionDto) {
    return this.routeActionsService.create(createRouteActionDto);
  }

  @Get()
  findAll() {
    return this.routeActionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routeActionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteActionDto: UpdateRouteActionDto) {
    return this.routeActionsService.update(+id, updateRouteActionDto);
  }

  @Patch('display/:id')
  updateDisplay(@Param('id') id: string, @Body() updateDisplayDto: UpdateDisplayDto) {
    return this.routeActionsService.updateDisplay(+id,updateDisplayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routeActionsService.remove(+id);
  }
}
