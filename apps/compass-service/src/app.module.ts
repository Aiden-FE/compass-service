import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { COMPASS_ENV, getEnv } from '@shared';
import { DBModule } from '@app/db';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OauthModule } from './oauth/oauth.module';

const importModules = [];

const sqlURL = getEnv(COMPASS_ENV.MYSQL_DATABASE_URL);

if (sqlURL) {
  importModules.push(DBModule);
}

@Module({
  imports: [
    // 局部可以通过 SkipThrottle Throttle 跳过或覆盖全局配置
    ThrottlerModule.forRoot({
      ttl: Number(getEnv(COMPASS_ENV.THROTTLER_TTL, '60')),
      limit: Number(getEnv(COMPASS_ENV.THROTTLER_LIMIT, '10')),
    }),
    OauthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
