import { Test, TestingModule } from '@nestjs/testing';
import { ReqestController } from './reqest.controller';
import { ReqestService } from './reqest.service';

describe('ReqestController', () => {
  let controller: ReqestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReqestController],
      providers: [ReqestService],
    }).compile();

    controller = module.get<ReqestController>(ReqestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
