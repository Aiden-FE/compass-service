import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { CompassEnv, getEnv } from '@shared';
import { DBModule } from '@app/db';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OauthModule } from './oauth/oauth.module';

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
      ttl: Number(getEnv(CompassEnv.THROTTLER_TTL, '60')),
      limit: Number(getEnv(CompassEnv.THROTTLER_LIMIT, '10')),
    }),
    OauthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
