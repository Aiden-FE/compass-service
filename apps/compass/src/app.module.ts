import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@libs/config";
import {DbModule} from "@libs/db";
import modules from './modules';
import {APP_GUARD} from "@nestjs/core";
import {AuthorizationGuard} from "@common";

@Module({
  imports: [
    ConfigModule,
    DbModule,
    ...modules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard
    },
  ],
})
export class AppModule {}
