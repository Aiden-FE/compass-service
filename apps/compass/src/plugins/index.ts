import {INestApplication} from "@nestjs/common";
import injectSwaggerPlugin from "./swagger.plugin";
import * as compression from 'compression';
import helmet from 'helmet';
import {APP_ENV} from "../config";
import {DbService} from "@libs/db";

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
  const dbService = app.get(DbService);
  await dbService.enableShutdownHooks(app)
}
