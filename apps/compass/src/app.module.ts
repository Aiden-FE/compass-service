import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@libs/config";
import {DbModule} from "@libs/db";
import modules from './modules';

@Module({
  imports: [
    ConfigModule,
    DbModule,
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
