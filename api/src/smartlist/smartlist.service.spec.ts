import { Test, TestingModule } from '@nestjs/testing';
import { SmartlistService } from './smartlist.service';

describe('SmartlistService', () => {
  let service: SmartlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmartlistService],
    }).compile();

    service = module.get<SmartlistService>(SmartlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
