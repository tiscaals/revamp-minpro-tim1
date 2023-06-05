import { Test, TestingModule } from '@nestjs/testing';
import { JobHireService } from './job-hire.service';

describe('JobHireService', () => {
  let service: JobHireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobHireService],
    }).compile();

    service = module.get<JobHireService>(JobHireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
