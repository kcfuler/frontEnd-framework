import { Test, TestingModule } from '@nestjs/testing';
import { ReqestService } from './reqest.service';

describe('ReqestService', () => {
  let service: ReqestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReqestService],
    }).compile();

    service = module.get<ReqestService>(ReqestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
