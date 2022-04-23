import { NestFactory } from '@nestjs/core';
import { ClayModule } from './clay.module';

async function bootstrap() {
  const app = await NestFactory.create(ClayModule);
  await app.listen(3000);
}
bootstrap();
