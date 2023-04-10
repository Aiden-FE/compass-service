import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import { LoggerMiddleware } from '@shared';
import provideExpressMiddleware from './express.middleware';

const requestIP = require('request-ip');

export default async function provideMiddleware(app: INestApplication) {
  app.use(requestIP.mw()); // req.clientIp 客户真实ip
  // 启用安全头标识
  app.use(helmet());
  app.use(new LoggerMiddleware().use);
  await provideExpressMiddleware(app);
}
