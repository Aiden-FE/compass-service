import { Test, TestingModule } from '@nestjs/testing';
import { ClayController } from './clay.controller';
import { ClayService } from './clay.service';

describe('ClayController', () => {
  let clayController: ClayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClayController],
      providers: [ClayService],
    }).compile();

    clayController = app.get<ClayController>(ClayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(clayController.getHello()).toBe('Hello World!');
    });
  });
});
