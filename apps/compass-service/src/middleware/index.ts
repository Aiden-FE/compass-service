import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export default async function provideMiddleware(app: INestApplication) {
  // 启用安全头标识
  app.use(helmet());
}
