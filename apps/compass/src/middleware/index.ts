import { INestApplication } from '@nestjs/common';
import injectExpressMiddleware from './express.middleware';
import LoggerMiddleware from './logger.middleware';

/**
 * @description 注入全局中间件
 * @param app
 */
export default function injectGlobalMiddleware(app: INestApplication) {
  injectExpressMiddleware(app);
  app.use(new LoggerMiddleware().use);
}
