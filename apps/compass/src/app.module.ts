import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@libs/config';
import { DbModule } from '@libs/db';
import modules from './modules';
import { COOKIE_TIMEOUT } from '@common';
import { SessionModule } from 'nestjs-session';
import { APP_KEY_COMPASS } from './config';

@Module({
  imports: [
    ConfigModule,
    DbModule,
    ...modules,
    SessionModule.forRoot({
      session: {
        secret: APP_KEY_COMPASS,
        cookie: {
          maxAge: COOKIE_TIMEOUT,
        },
        rolling: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
