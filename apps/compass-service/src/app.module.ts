import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { CompassEnv, getEnv } from '@shared';
import { DBModule } from '@app/db';
import { JwtAuthGuard } from '@shared/guards';
import { APP_GUARD } from '@nestjs/core';
import { RedisManagerModule, RedisManagerService } from '@app/redis-manager';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import allModules from './modules';

@Module({
  imports: [
    DBModule,
    RedisManagerModule,
    // 局部可以通过 SkipThrottle Throttle 跳过或覆盖全局配置
    ThrottlerModule.forRootAsync({
      useFactory(redisService: RedisManagerService) {
        const redis = redisService.getClient();
        return {
          // 单位秒
          ttl: Number(getEnv(CompassEnv.THROTTLER_TTL)),
          // 单位时间内限制的次数
          limit: Number(getEnv(CompassEnv.THROTTLER_LIMIT)),
          storage: new ThrottlerStorageRedisService(redis),
        };
      },
      inject: [RedisManagerService],
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
