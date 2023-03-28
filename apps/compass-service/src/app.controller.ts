import { Controller, Get, Query, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { AppQueryDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Version('2')
  @Get()
  getHelloV2(@Query() query: AppQueryDto) {
    console.log('Query: ', query);
    return this.appService.getHello();
  }
}
