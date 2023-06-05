import { Test, TestingModule } from '@nestjs/testing';
import { PlacementController } from './placement.controller';
import { PlacementService } from './placement.service';

describe('PlacementController', () => {
  let controller: PlacementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacementController],
      providers: [PlacementService],
    }).compile();

    controller = module.get<PlacementController>(PlacementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
