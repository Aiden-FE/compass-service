import { Test, TestingModule } from '@nestjs/testing';
import { HourglassController } from './hourglass.controller';
import { HourglassService } from './hourglass.service';

describe('HourglassController', () => {
  let hourglassController: HourglassController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HourglassController],
      providers: [HourglassService],
    }).compile();

    hourglassController = app.get<HourglassController>(HourglassController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(hourglassController.getHello()).toBe('Hello World!');
    });
  });
});
