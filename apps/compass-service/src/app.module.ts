import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { getEnv, COMPASS_THROTTLER_TTL, COMPASS_THROTTLER_LIMIT } from '@shared';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // 局部可以通过 SkipThrottle Throttle 跳过或覆盖全局配置
    ThrottlerModule.forRoot({
      ttl: Number(getEnv(COMPASS_THROTTLER_TTL, '60')),
      limit: Number(getEnv(COMPASS_THROTTLER_LIMIT, '10')),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
