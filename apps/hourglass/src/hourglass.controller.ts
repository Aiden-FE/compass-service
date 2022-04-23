import { Controller, Get } from '@nestjs/common';
import { HourglassService } from './hourglass.service';

@Controller()
export class HourglassController {
  constructor(private readonly hourglassService: HourglassService) {}

  @Get()
  getHello(): string {
    return this.hourglassService.getHello();
  }
}
