import { Controller, Get, Query, Version } from '@nestjs/common';
import { HttpResponse } from '@shared';
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
    return this.appService.getHello() + JSON.stringify(query);
  }

  @Version('3')
  @Get()
  getHelloV3() {
    return new HttpResponse(this.appService.getHello(), {
      details: '详情测试',
      responseType: 'string',
    });
  }
}
