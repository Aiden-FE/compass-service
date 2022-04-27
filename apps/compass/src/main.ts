import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import injectGlobalPlugins from "./plugins";
import injectGlobalMiddleware from "./middleware";
import {API_PREFIX, SERVER_PORT} from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await injectGlobalPlugins(app)
  injectGlobalMiddleware(app)
  app.setGlobalPrefix(API_PREFIX)
  await app.listen(SERVER_PORT);
}

bootstrap()
  .then(() => console.info('Compass service 启动成功.'))
  .catch((err) => console.error(err));
