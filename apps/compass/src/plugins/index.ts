import {INestApplication, ValidationPipe} from "@nestjs/common";
import injectSwaggerPlugin from "./swagger.plugin";
import * as compression from 'compression';
import helmet from 'helmet';
import {APP_ENV} from "../config";
import {DbService} from "@libs/db";
import {ResponseInterceptor} from "@common";

/**
 * @description 注入全局插件
 * @param app
 */
export default async function injectGlobalPlugins (app: INestApplication) {
  injectSwaggerPlugin(app)
  app.use(compression());
  app.use(
    helmet({ contentSecurityPolicy: APP_ENV.isProd ? undefined : false }),
  );
  app.useGlobalPipes(new ValidationPipe({
    whitelist: false, // 非DTO属性自动移除
    transform: true, // 自动将类型转换为定义的类型
  }));
  app.useGlobalInterceptors(new ResponseInterceptor())
  const dbService = app.get(DbService);
  await dbService.enableShutdownHooks(app)
}
