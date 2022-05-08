import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import {LoggerModule} from "@libs/logger";
import {DbService} from "@libs/db";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    LoggerModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, DbService],
})
export class CategoriesModule {}
