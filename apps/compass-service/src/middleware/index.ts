import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import { LoggerMiddleware } from '@shared';
import provideExpressMiddleware from './express.middleware';

export default async function provideMiddleware(app: INestApplication) {
  // 启用安全头标识
  app.use(helmet());
  app.use(new LoggerMiddleware().use);
  await provideExpressMiddleware(app);
}
