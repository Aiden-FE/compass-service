import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import { DbService } from '@libs/db';
import { HttpExceptionFilter, ResponseInterceptor } from '@common';
import { APP_ENV } from '../config';
import injectSwaggerPlugin from './swagger.plugin';

/**
 * @description 注入全局插件
 * @param app
 */
export default async function injectGlobalPlugins(app: INestApplication) {
  injectSwaggerPlugin(app);
  app.use(compression());
  app.use(
    helmet({ contentSecurityPolicy: APP_ENV.isProd ? undefined : false }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 非DTO属性自动移除
      transform: true, // 自动将类型转换为定义的类型
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  const dbService = app.get(DbService);
  await dbService.enableShutdownHooks(app);
}
