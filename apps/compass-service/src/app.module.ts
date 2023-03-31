import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { CompassEnv, getEnv } from '@shared';
import { DBModule } from '@app/db';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { JwtAuthGuard } from '@shared/guards';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import allModules from './modules';

const importModules = [];

const sqlURL = getEnv(CompassEnv.MYSQL_DATABASE_URL);
const redisHost = getEnv(CompassEnv.REDIS_HOST);
const redisPort = getEnv(CompassEnv.REDIS_PORT);
const redisPassword = getEnv(CompassEnv.REDIS_PASSWORD);

if (sqlURL) {
  importModules.push(DBModule);
}

if (redisHost && redisPort && redisPassword) {
  importModules.push(
    // Usage example: @InjectRedis() private readonly redis: Redis
    RedisModule.forRoot({
      config: {
        host: redisHost,
        port: Number(redisPort),
        password: redisPassword,
      },
    }),
  );
}

@Module({
  imports: [
    // 局部可以通过 SkipThrottle Throttle 跳过或覆盖全局配置
    ThrottlerModule.forRoot({
      // 单位秒
      ttl: Number(getEnv(CompassEnv.THROTTLER_TTL)),
      // 单位时间内限制的次数
      limit: Number(getEnv(CompassEnv.THROTTLER_LIMIT)),
    }),
    ...allModules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
