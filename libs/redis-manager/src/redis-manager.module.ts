import { Global, Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { CompassEnv, getEnv } from '@shared';
import { RedisManagerService } from './redis-manager.service';

const redisHost = getEnv(CompassEnv.REDIS_HOST);
const redisPort = getEnv(CompassEnv.REDIS_PORT);
const redisPassword = getEnv(CompassEnv.REDIS_PASSWORD);

@Global()
@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: redisHost,
        port: Number(redisPort),
        password: redisPassword,
      },
    }),
  ],
  providers: [RedisManagerService],
  exports: [RedisModule, RedisManagerService],
})
export class RedisManagerModule {}
