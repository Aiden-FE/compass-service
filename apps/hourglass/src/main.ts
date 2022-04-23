import { NestFactory } from '@nestjs/core';
import { HourglassModule } from './hourglass.module';

async function bootstrap() {
  const app = await NestFactory.create(HourglassModule);
  await app.listen(3000);
}
bootstrap();
