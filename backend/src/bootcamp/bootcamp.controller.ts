import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BootcampService } from './bootcamp.service';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';

@Controller('bootcamp')
export class BootcampController {
  constructor(private readonly bootcampService: BootcampService) {}

  @Post()
  create(@Body() createBootcampDto: any) {
    return this.bootcampService.createBatch(createBootcampDto);
  }

  @Get()
  findAll() {
    return this.bootcampService.findAllBatch();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.bootcampService.findOneBatch(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBootcampDto: UpdateBootcampDto,
  ) {
    return this.bootcampService.updateBatch(+id, updateBootcampDto);
  }

  @Patch('status/:id/:status')
  changeStatus(@Param('id') id: string, @Param('status') status: string) {
    return this.bootcampService.changeStatus(+id, status);
  }

  @Post('evaluation')
  createEvaluationWeek(@Body() body: CreateBootcampDto) {
    return this.bootcampService.createEvaluation(body);
  }
  //Router Tabel Program Apply dan Program Apply Progress

  @Get('program-apply')
  findAllProgram() {
    return this.bootcampService.findAllProgramApply();
  }

  @Post('program-apply')
  createProgramApply(@Body() createBootcampDto: any) {
    return this.bootcampService.createProgram(createBootcampDto);
  }

  @Get('close')
  setClose(){
    return this.bootcampService.closeBatch()
  }

  @Delete(':id')
  deleteBatch(@Param('id') id: number){
    return this.bootcampService.remove(id)
  }

  @Patch('program-apply-progress/:id')
  updateProgramApplyProgress(
    @Param('id') id: number,
    @Body() body: any,
  ) {
    return this.bootcampService.changeProgressName(
      id,
      body
    )
  }

  @Patch('program-apply/:id/:progid')
  updateProgramApply(
    @Param('id') id: number,
    @Param('progid') progid: number,
    @Body() body: any,
  ) {
    // return body
    return this.bootcampService.updateProgramApply(
      +id,
      progid,
      body
    )
  }

  @Get('trainers')
  findAllTrainers(){
    return this.bootcampService.getAllTrainers()
  }

  @Get('programs')
  findAllPrograms(){
    return this.bootcampService.getAllPrograms()
  }

  @Get('recstudents/:id')
  findRecommendedStudents(@Param('id') id: number){
    return this.bootcampService.getRecommendedStudents(id)
  }

  @Get('routeactions')
  findAllRoutes(){
    return this.bootcampService.getRouteActions()
  }

  @Get('batchtrainees/:id')
  findAllBatchTrainee(@Param('id') id:number){
    return this.bootcampService.getTraineesByBatchId(id)
  }

  @Patch('setresign/:batrid')
  settraineetoresign(@Param('batrid') batrid: number, @Body() body: any){
    return this.bootcampService.setTraineeResign(batrid,body)
  }
}
