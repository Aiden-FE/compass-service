import { INestApplication } from '@nestjs/common';
import { LoggerMiddleware } from '@shared';
import provideExpressMiddleware from './express.middleware';

// eslint-disable-next-line import/no-extraneous-dependencies
const requestIP = require('request-ip');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');

export default async function provideMiddleware(app: INestApplication) {
  app.use(requestIP.mw()); // req.clientIp 客户真实ip
  // 启用安全头标识
  app.use(helmet());
  app.use(new LoggerMiddleware().use);
  await provideExpressMiddleware(app);
}
