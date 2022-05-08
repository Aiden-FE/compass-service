import { Module } from '@nestjs/common';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksService } from './bookmarks.service';
import {DbService} from "@libs/db";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [BookmarksController],
  providers: [BookmarksService, DbService]
})
export class BookmarksModule {}
