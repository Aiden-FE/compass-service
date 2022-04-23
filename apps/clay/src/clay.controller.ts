import { Controller, Get } from '@nestjs/common';
import { ClayService } from './clay.service';

@Controller()
export class ClayController {
  constructor(private readonly clayService: ClayService) {}

  @Get()
  getHello(): string {
    return this.clayService.getHello();
  }
}
