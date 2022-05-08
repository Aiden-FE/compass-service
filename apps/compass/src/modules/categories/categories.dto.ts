import {IsIn, IsNumber, IsOptional, IsString, MaxLength, MinLength} from "class-validator";
import {DESC_MAX_LIMIT, KEYWORD_MAX_LIMIT, PaginationDto, TITLE_MAX_LIMIT, TITLE_MIN_LIMIT} from "@common";

export enum CategoriesScopedEnum {
  BOOKMARKS = 'bookmarks'
}

export class CategoriesUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(TITLE_MAX_LIMIT)
  @MinLength(TITLE_MIN_LIMIT)
  name?: string
  
  @IsOptional()
  @IsString()
  @MaxLength(DESC_MAX_LIMIT)
  description?: string
  
  @IsOptional()
  @IsNumber()
  parentId?: number
}

export class CategoriesCreateDto extends CategoriesUpdateDto {
  @IsString()
  @MaxLength(TITLE_MAX_LIMIT)
  @MinLength(TITLE_MIN_LIMIT)
  name: string

  @IsIn(Object.values(CategoriesScopedEnum))
  scoped: CategoriesScopedEnum
}

export class CategoriesQueryDto extends PaginationDto {
  @IsOptional()
  @MaxLength(KEYWORD_MAX_LIMIT)
  @IsString()
  keyword?: string;
}
