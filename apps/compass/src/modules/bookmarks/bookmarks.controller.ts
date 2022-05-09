import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {Authorization, AuthorizationGuard, PermissionsEnum} from "@common";
import {AuthGuard} from "@nestjs/passport";
import {BookmarksCreateDto, BookmarksQueryDto, BookmarkUpdateDto} from "./bookmarks.dto";
import {BookmarksService} from "./bookmarks.service";
import {Request} from "express";
import {UserModel} from "../users/users.dto";

@UseGuards(AuthGuard(), AuthorizationGuard)
@Controller('bookmarks')
export class BookmarksController {
  constructor(
    private bookmarksService: BookmarksService,
  ) {
  }
  @Authorization(PermissionsEnum.COMMON_BOOKMARKS_CREATE)
  @Post()
  create (
    @Body() body: BookmarksCreateDto,
    @Req() req: Request,
  ) {
    return this.bookmarksService.createBookmark(body, req.user as UserModel)
  }
  
  @Authorization(PermissionsEnum.COMMON_BOOKMARKS_DELETE)
  @Delete(':id')
  delete (
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    return this.bookmarksService.deleteBookmark(Number(id), req.user as UserModel)
  }
  
  @Authorization(PermissionsEnum.COMMON_BOOKMARKS_UPDATE)
  @Put(':id')
  update (
    @Param('id') id: string,
    @Body() body: BookmarkUpdateDto,
    @Req() req: Request,
  ) {
    return this.bookmarksService.updateBookmark(Number(id), body, req.user as UserModel)
  }
  
  @Authorization(PermissionsEnum.COMMON_BOOKMARKS_QUERY)
  @Get(':id')
  findBookmark (
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    return this.bookmarksService.findBookmark(Number(id), req.user as UserModel)
  }
  
  @Authorization(PermissionsEnum.COMMON_BOOKMARKS_QUERY)
  @Get()
  findBookmarks (
    @Query() query: BookmarksQueryDto,
    @Req() req: Request,
  ) {
    return this.bookmarksService.findBookmarks(query, req.user as UserModel)
  }
}
