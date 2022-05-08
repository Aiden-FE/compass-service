import { Injectable } from '@nestjs/common';
import {CategoriesCreateDto, CategoriesQueryDto, CategoriesUpdateDto} from "./categories.dto";
import {DbService} from "@libs/db";
import {PaginationResponse, ResponseException, wrapPaginationQuery} from "@common";

@Injectable()
export class CategoriesService {
  constructor(private dbService: DbService) {}
  async findCategories (data: CategoriesQueryDto) {
    const [total, categories] = await this.dbService.$transaction([
      this.dbService.category.count({
        where: {
          name: {
            contains: data.keyword
          }
        }
      }),
      this.dbService.category.findMany({
        ...wrapPaginationQuery(data),
        where: {
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
  
  findCategory (id: number) {
    return this.dbService.category.findFirst({
      where: {id},
      include: {
        bookmarks: true
      }
    })
  }
  
  async updateCategory (id: number, data: CategoriesUpdateDto) {
    const category = await this.dbService.category.findFirst({
      where: {id: data.parentId}
    })
    return this.dbService.category.update({
      where: {id},
      data: {
        ...data,
        directory: data.parentId
          ? await this.getDirectory(data, category)
          : undefined
      }
    })
  }
  
  deleteCategory (id: number) {
    const children = this.dbService.category.findFirst({where: {parentId: id}})
    if (children) {
      return new ResponseException("存在子节点,不可删除")
    }
    return this.dbService.category.delete({where: {id}})
  }
  
  async createCategory (data: CategoriesCreateDto) {
    const insertData: CategoriesCreateDto & {directory: string} = {
      ...data,
      directory: await this.getDirectory(data)
    }
    return this.dbService.category.create({
      data: insertData
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
