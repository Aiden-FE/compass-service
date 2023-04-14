import { NestFactory } from '@nestjs/core';
import { CompassEnv, getEnv } from '@shared';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import providePlugins from './plugins';
import provideMiddleware from './middleware';
import { APP_LOG_CONTEXT } from './config';

const LISTEN_PORT = Number(getEnv(CompassEnv.LISTEN_PORT));
Logger.overrideLogger(['log']);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await providePlugins(app);
  await provideMiddleware(app);
  await app.listen(LISTEN_PORT);
}

bootstrap().then(() => Logger.log(`Listening on ${LISTEN_PORT} port`, APP_LOG_CONTEXT));
