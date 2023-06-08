import { Module } from '@nestjs/common';
import { JobHireService } from './job-hire.service';
import { JobHireController } from './job-hire.controller';

@Module({
  controllers: [JobHireController],
  providers: [JobHireService],
})
export class JobHireModule {}
