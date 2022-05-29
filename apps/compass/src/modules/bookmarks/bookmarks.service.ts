import { Injectable } from '@nestjs/common';
import {DbService} from "@libs/db";
import {BookmarksCreateDto, BookmarksQueryDto, BookmarkUpdateDto} from "./bookmarks.dto";
import {PaginationResponse, ResponseException, wrapPaginationQuery} from "@common";
import {UserModel} from "../users/users.dto";

@Injectable()
export class BookmarksService {
  constructor(private dbService: DbService) {}
  async findBookmarks (data: BookmarksQueryDto, user: UserModel) {
    const [total, bookmarks] = await this.dbService.$transaction([
      this.dbService.bookmark.count({
        where: {
          userId: user.id,
          name: {
            contains: data.keyword
          }
        }
      }),
      this.dbService.bookmark.findMany({
        ...wrapPaginationQuery(data),
        where: {
          userId: user.id,
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
    
    return new PaginationResponse(bookmarks.map(bookmark => {
      // @ts-ignore
      bookmark.categories = bookmark.categories.map(category => category.id)
      return bookmark
    }), data, total)
  }
  
  findBookmark (id: number, user: UserModel) {
    return this.dbService.bookmark.findFirst({
      where: {id, userId: user.id},
      include: {
        categories: true
      }
    })
  }
  
  async updateBookmark (id: number, data: BookmarkUpdateDto, user: UserModel) {
    let heat: number
    if (data.increaseHeat) {
      const bookmark = await this.dbService.bookmark.findFirst({where: {id}})
      if (bookmark) {
        heat = bookmark.heat + Number(data.increaseHeat.toFixed())
      }
      delete data.increaseHeat
    }
    const additionalData: any = {}
    if (data.categories) {
      additionalData.categories = {
        set: data.categories.map(id => ({id}))
      }
    }
    return this.dbService.bookmark.update({
      where: {id},
      data: {
        ...data,
        heat,
        ...additionalData
      },
    })
  }
  
  deleteBookmark (id: number, user: UserModel) {
    return this.dbService.bookmark.deleteMany({
      where: {id, userId: user.id}
    })
  }
  
  createBookmark (data: BookmarksCreateDto, user: UserModel) {
    return this.dbService.bookmark.create({
      data: {
        ...data,
        userId: user.id,
        categories: {
          connect: data.categories?.map(id => ({id}))
        }
      }
    })
  }
}
