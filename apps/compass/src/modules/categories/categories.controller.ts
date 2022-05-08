import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {CategoriesCreateDto, CategoriesQueryDto, CategoriesUpdateDto} from "./categories.dto";
import {AuthGuard} from "@nestjs/passport";
import {Authorization, AuthorizationGuard, PermissionsEnum} from "@common";
import {CategoriesService} from "./categories.service";
import {Request} from 'express'
import {UserModel} from "../users/users.dto";

@UseGuards(AuthGuard(), AuthorizationGuard)
@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService,
  ) {
  }
  @Authorization(PermissionsEnum.COMMON_CATEGORIES_CREATE)
  @Post()
  create (
    @Body() body: CategoriesCreateDto,
    @Req() req: Request
  ) {
    return this.categoriesService.createCategory(body, req.user as UserModel)
  }
  
  @Authorization(PermissionsEnum.COMMON_CATEGORIES_DELETE)
  @Delete(':id')
  delete (
    @Param('id') id: string,
    @Req() req: Request
  ) {
    return this.categoriesService.deleteCategory(Number(id), req.user as UserModel)
  }
  
  @Authorization(PermissionsEnum.COMMON_CATEGORIES_UPDATE)
  @Put(':id')
  update (
    @Param('id') id: string,
    @Body() body: CategoriesUpdateDto,
    @Req() req: Request
  ) {
    return this.categoriesService.updateCategory(Number(id), body, req.user as UserModel)
  }
  
  @Authorization(PermissionsEnum.COMMON_CATEGORIES_QUERY)
  @Get(':id')
  findCategory (
    @Param('id') id: string,
    @Req() req: Request
  ) {
    return this.categoriesService.findCategory(Number(id), req.user as UserModel)
  }
  
  @Authorization(PermissionsEnum.COMMON_CATEGORIES_QUERY)
  @Get()
  findCategories (
    @Query() query: CategoriesQueryDto,
    @Req() req: Request
  ) {
    return this.categoriesService.findCategories(query, req.user as UserModel)
  }
}
