import { Injectable } from '@nestjs/common';
import {DbService} from "@libs/db";
import {BookmarksCreateDto, BookmarksQueryDto, BookmarkUpdateDto} from "./bookmarks.dto";
import {PaginationResponse, wrapPaginationQuery} from "@common";

@Injectable()
export class BookmarksService {
  constructor(private dbService: DbService) {}
  async findBookmarks (data: BookmarksQueryDto) {
    const [total, bookmarks] = await this.dbService.$transaction([
      this.dbService.bookmark.count({
        where: {
          name: {
            contains: data.keyword
          }
        }
      }),
      this.dbService.bookmark.findMany({
        ...wrapPaginationQuery(data),
        where: {
          name: {
            contains: data.keyword
          }
        },
        include: {
          categories: true
        },
        orderBy: [{ heat: 'desc' }]
      })
    ])
    
    return new PaginationResponse(bookmarks, data, total)
  }
  
  findBookmark (id: number) {
    return this.dbService.bookmark.findFirst({
      where: {id},
      include: {
        categories: true
      }
    })
  }
  
  async updateBookmark (id: number, data: BookmarkUpdateDto) {
    let heat: number
    if (data.increaseHeat) {
      const bookmark = await this.dbService.bookmark.findFirst({where: {id}})
      if (bookmark) {
        heat = bookmark.heat + Number(data.increaseHeat.toFixed())
      }
      delete data.increaseHeat
    }
    return this.dbService.bookmark.update({
      where: {id},
      data: {
        ...data,
        heat
      }
    })
  }
  
  deleteBookmark (id: number) {
    return this.dbService.bookmark.delete({where: {id}})
  }
  
  createBookmark (data: BookmarksCreateDto) {
    return this.dbService.bookmark.create({
      data: {
        ...data,
        categories: {
          connect: data.categories?.map(id => ({id}))
        }
      }
    })
  }
}
