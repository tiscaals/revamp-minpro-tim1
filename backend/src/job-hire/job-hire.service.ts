import { Injectable } from '@nestjs/common';
import { CreateJobHireDto } from './dto/create-job-hire.dto';
import { UpdateJobHireDto } from './dto/update-job-hire.dto';

@Injectable()
export class JobHireService {
  create(createJobHireDto: CreateJobHireDto) {
    return 'This action adds a new jobHire';
  }

  findAll() {
    return `This action returns all jobHire`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobHire`;
  }

  update(id: number, updateJobHireDto: UpdateJobHireDto) {
    return `This action updates a #${id} jobHire`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobHire`;
  }
}
