import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlacementService } from './placement.service';
// import { CreatePlacementDto } from './dto/create-placement.dto';
// import { UpdatePlacementDto } from './dto/update-placement.dto';

@Controller('placement')
export class PlacementController {
  constructor(private readonly placementService: PlacementService) {}

  @Get()
  viewEmployee() {
    return this.placementService.viewEmployee();
  }

  @Get('talents')
  viewTalents() {
    return this.placementService.viewTalents();
  }

  @Get('talentsJob')
  viewTalentsJob() {
    return this.placementService.viewTalentsJob();
  }

  @Get('search')
  searchUsers() {
    return this.placementService.searchUsers();
  }

  @Get('client')
  searchClient() {
    return this.placementService.searchClient();
  }

  @Get('dpm')
  department() {
    return this.placementService.department();
  }

  @Get('masterjoro')
  masterJoRo() {
    return this.placementService.masterJoRo();
  }

  @Get('usersRoles')
  usersRoles() {
    return this.placementService.usersRoles();
  }

  @Get('jobType')
  jobType() {
    return this.placementService.jobType();
  }

  @Get('AM')
  accountManager() {
    return this.placementService.accountManager();
  }

  @Get('findemployee/:id')
  findEmployee(@Param('id') id:string){
    return this.placementService.findEmployee(+id)
  }

  @Get('depthistory/:id')
  deptHistory(@Param('id') id:string){
    return this.placementService.deptHistory(+id)
  }
  
  @Get('salhistory/:id')
  salaryHistory(@Param('id') id:string){
    return this.placementService.salaryHistory(+id)
  }

  @Post('create')
  createEmployee(@Body() createPlacementDto: any) {
    console.log('bodat', createPlacementDto);
    return this.placementService.createEmployee(createPlacementDto);
  }

  @Post('contract')
  createContractClientEmployee(@Body() createPlacementDto: any) {
    return this.placementService.createContractClientEmployee(
      createPlacementDto,
    );
  }

  @Patch('update')
  updateEmployee(@Body() data:any){
    return this.placementService.updateEmployee(data)
  }

  // @Get()
  // findAll() {
  //   return this.placementService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.placementService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePlacementDto: UpdatePlacementDto) {
  //   return this.placementService.update(+id, updatePlacementDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.placementService.remove(+id);
  // }
}
