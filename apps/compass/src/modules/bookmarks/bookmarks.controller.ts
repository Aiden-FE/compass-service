import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {Authorization, AuthorizationGuard, PermissionsEnum} from "@common";
import {AuthGuard} from "@nestjs/passport";
import {BookmarksCreateDto, BookmarksQueryDto, BookmarkUpdateDto} from "./bookmarks.dto";
import {BookmarksService} from "./bookmarks.service";

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
    @Body() body: BookmarksCreateDto
  ) {
    return this.bookmarksService.createBookmark(body)
  }
  
  @Authorization(PermissionsEnum.COMMON_BOOKMARKS_DELETE)
  @Delete(':id')
  delete (@Param('id') id: string) {
    return this.bookmarksService.deleteBookmark(Number(id))
  }
  
  @Authorization(PermissionsEnum.COMMON_BOOKMARKS_UPDATE)
  @Put(':id')
  update (
    @Param('id') id: string,
    @Body() body: BookmarkUpdateDto,
  ) {
    return this.bookmarksService.updateBookmark(Number(id), body)
  }
  
  @Authorization(PermissionsEnum.COMMON_BOOKMARKS_QUERY)
  @Get(':id')
  findBookmark (
    @Param('id') id: string
  ) {
    return this.bookmarksService.findBookmark(Number(id))
  }
  
  @Authorization(PermissionsEnum.COMMON_BOOKMARKS_QUERY)
  @Get()
  findBookmarks (
    @Query() query: BookmarksQueryDto
  ) {
    return this.bookmarksService.findBookmarks(query)
  }
}
