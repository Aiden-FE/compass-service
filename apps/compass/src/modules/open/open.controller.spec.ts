import { Test, TestingModule } from '@nestjs/testing';
import { OpenController } from './open.controller';

describe('OpenController', () => {
  let controller: OpenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenController],
    }).compile();

    controller = module.get<OpenController>(OpenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
