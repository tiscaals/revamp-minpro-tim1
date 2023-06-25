import { Injectable } from '@nestjs/common';
import { CreateRouteActionDto } from './dto/create-route_action.dto';
import { UpdateRouteActionDto } from './dto/update-route_action.dto';
import { route_actions } from 'models/master';
import { UpdateDisplayDto } from './dto/update-display';

@Injectable()
export class RouteActionsService {
  async create(createRouteActionDto: CreateRouteActionDto) {
    try {
      const result = await route_actions.create(createRouteActionDto)
      console.log('object')
    } catch (error) {
      console.log(error.message)
      // return error.message
    }
  }

  async findAll() {
    try {
      const result =await route_actions.findAll()
      return result;
    } catch (error) {
      return error.message
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} routeAction`;
  }

  async update(id: number, updateRouteActionDto: UpdateRouteActionDto) {
    try {
      const result = await route_actions.update(updateRouteActionDto,{where : {roac_id : id}})
      return result
    } catch (error) {
      return error.message
    }
  }

  async updateDisplay(id: number, updateDisplayDto: UpdateDisplayDto) {
    try {
      const result = await route_actions.update(updateDisplayDto,{where : {roac_id : id}})
      return result
    } catch (error) {
      return error.message
    }
  }

  async remove(id: number) {
    try {
      const result =await route_actions.destroy({where: {roac_id : id}})
      return result
    } catch (error) {
      return error.message
    }
  }
}
