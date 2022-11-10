import { Test, TestingModule } from '@nestjs/testing';
import { SmartlistController } from './smartlist.controller';

describe('SmartlistController', () => {
  let controller: SmartlistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmartlistController],
    }).compile();

    controller = module.get<SmartlistController>(SmartlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
