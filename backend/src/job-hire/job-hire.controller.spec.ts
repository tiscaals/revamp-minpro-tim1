import { Test, TestingModule } from '@nestjs/testing';
import { JobHireController } from './job-hire.controller';
import { JobHireService } from './job-hire.service';

describe('JobHireController', () => {
  let controller: JobHireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobHireController],
      providers: [JobHireService],
    }).compile();

    controller = module.get<JobHireController>(JobHireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
