import { Injectable } from '@nestjs/common';

@Injectable()
export class HourglassService {
  getHello(): string {
    return 'Hello World!';
  }
}
