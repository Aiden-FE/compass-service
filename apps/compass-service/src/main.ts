import { NestFactory } from '@nestjs/core';
import { COMPASS_LISTEN_PORT, getEnv, NODE_ENV } from '@shared';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import providePlugins from './plugins';
import provideMiddleware from './middleware';

const LISTEN_PORT = Number(getEnv(COMPASS_LISTEN_PORT, '8080'));
Logger.overrideLogger(getEnv(NODE_ENV) === 'development' ? ['log'] : ['warn']);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await providePlugins(app);
  await provideMiddleware(app);
  await app.listen(LISTEN_PORT);
}

bootstrap().then(() => Logger.log(`Listening on ${LISTEN_PORT} port`, 'Compass'));
