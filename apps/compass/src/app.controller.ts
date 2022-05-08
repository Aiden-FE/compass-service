import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@libs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello() + new Date().toString();
  }
}
