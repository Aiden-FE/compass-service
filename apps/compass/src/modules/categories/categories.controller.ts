import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {CategoriesCreateDto, CategoriesQueryDto, CategoriesUpdateDto} from "./categories.dto";
import {AuthGuard} from "@nestjs/passport";
import {Authorization, AuthorizationGuard, PermissionsEnum} from "@common";
import {CategoriesService} from "./categories.service";

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
    @Body() body: CategoriesCreateDto
  ) {
    return this.categoriesService.createCategory(body)
  }
  
  @Authorization(PermissionsEnum.COMMON_CATEGORIES_DELETE)
  @Delete(':id')
  delete (@Param('id') id: string) {
    return this.categoriesService.deleteCategory(Number(id))
  }
  
  @Authorization(PermissionsEnum.COMMON_CATEGORIES_UPDATE)
  @Put(':id')
  update (
    @Param('id') id: string,
    @Body() body: CategoriesUpdateDto,
  ) {
    return this.categoriesService.updateCategory(Number(id), body)
  }
  
  @Authorization(PermissionsEnum.COMMON_CATEGORIES_QUERY)
  @Get(':id')
  findCategory (
    @Param('id') id: string
  ) {
    return this.categoriesService.findCategory(Number(id))
  }
  
  @Authorization(PermissionsEnum.COMMON_CATEGORIES_QUERY)
  @Get()
  findCategories (
    @Query() query: CategoriesQueryDto,
  ) {
    return this.categoriesService.findCategories(query)
  }
}
