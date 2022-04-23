import { Injectable } from '@nestjs/common';

@Injectable()
export class ClayService {
  getHello(): string {
    return 'Hello World!';
  }
}
