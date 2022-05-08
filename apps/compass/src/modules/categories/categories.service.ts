import { Injectable } from '@nestjs/common';
import {CategoriesCreateDto, CategoriesQueryDto, CategoriesUpdateDto} from "./categories.dto";
import {DbService} from "@libs/db";
import {PaginationResponse, ResponseException, wrapPaginationQuery} from "@common";
import {UserModel} from "../users/users.dto";

@Injectable()
export class CategoriesService {
  constructor(private dbService: DbService) {}
  async findCategories (data: CategoriesQueryDto, user: UserModel) {
    const [total, categories] = await this.dbService.$transaction([
      this.dbService.category.count({
        where: {
          userId: user.id,
          name: {
            contains: data.keyword
          }
        }
      }),
      this.dbService.category.findMany({
        ...wrapPaginationQuery(data),
        where: {
          userId: user.id,
          name: {
            contains: data.keyword
          }
        },
        include: {
          bookmarks: true
        },
        orderBy: [{ updatedAt: 'desc' }]
      })
    ])
    
    return new PaginationResponse(categories, data, total)
  }
  
  findCategory (id: number, user: UserModel) {
    return this.dbService.category.findFirst({
      where: {id, userId: user.id},
      include: {
        bookmarks: true
      }
    })
  }
  
  async updateCategory (id: number, data: CategoriesUpdateDto, user: UserModel) {
    return this.dbService.category.updateMany({
      where: {id, userId: user.id},
      data: {
        ...data,
        directory: data.parentId
          ? await this.getDirectory(data)
          : undefined
      }
    })
  }
  
  deleteCategory (id: number, user: UserModel) {
    const children = this.dbService.category.findFirst({
      where: {
        parentId: id,
        userId: user.id
      }
    })
    if (children) {
      return new ResponseException("存在子节点,不可删除")
    }
    return this.dbService.category.deleteMany({
      where: {
        id,
        userId: user.id
      }
    })
  }
  
  async createCategory (data: CategoriesCreateDto, user: UserModel) {
    const insertData: CategoriesCreateDto & {directory: string} = {
      ...data,
      directory: await this.getDirectory(data),
    }
    if (insertData.parentId && insertData.parentId !== -1) {
      const parentCategory = await this.dbService.category.findFirst({
        where: {
          id: insertData.parentId,
          userId: user.id
        }
      })
      if (!parentCategory) {
        return new ResponseException('不存在目标父级分类')
      }
    }
    return this.dbService.category.create({
      data: {
        ...insertData,
        userId: user.id
      }
    })
  }
  
  private async getDirectory (data: Partial<CategoriesCreateDto>, categoryOrigin?: any) {
    if (data.parentId && data.parentId !== -1) {
      const category = categoryOrigin || await this.dbService.category.findFirst({
        where: {id: data.parentId}
      })
      if (category) {
        return `${category.directory}/${category.id}`.replace(/\/\//g, '/')
      }
    }
    return '/'
  }
}
