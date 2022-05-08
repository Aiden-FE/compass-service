// const dot = require('dotenv').config({ path: require('path').join(__dirname, '', '.env')})
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import injectGlobalPlugins from './plugins';
import injectGlobalMiddleware from './middleware';
import { API_PREFIX, SERVER_PORT } from './config';

console.log('DEBUG: ', process.env)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await injectGlobalPlugins(app);
  injectGlobalMiddleware(app);
  app.setGlobalPrefix(API_PREFIX);
  await app.listen(SERVER_PORT);
}

bootstrap()
  // eslint-disable-next-line no-console
  .then(() => console.info('Compass service 启动成功.'))
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err));
