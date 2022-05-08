import { Module } from '@nestjs/common';
import { ConfigModule } from '@libs/config';
import { DbModule } from '@libs/db';
import { COOKIE_TIMEOUT } from '@common';
import { SessionModule } from 'nestjs-session';
import modules from './modules';
import { AppService } from './app.service';
import { AppController } from './app.controller';
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
