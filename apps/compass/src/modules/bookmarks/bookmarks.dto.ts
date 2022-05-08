import {IsArray, IsNumber, IsOptional, IsString, IsUrl, MaxLength, MinLength} from "class-validator";
import {
  DESC_MAX_LIMIT,
  KEYWORD_MAX_LIMIT,
  PaginationDto,
  TITLE_MAX_LIMIT,
  TITLE_MIN_LIMIT,
  URL_MAX_LIMIT
} from "@common";

export class BookmarkUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(TITLE_MAX_LIMIT)
  @MinLength(TITLE_MIN_LIMIT)
  name?: string
  
  @IsOptional()
  @IsUrl()
  @MaxLength(URL_MAX_LIMIT)
  url?: string
  
  @IsOptional()
  @IsString()
  @MaxLength(DESC_MAX_LIMIT)
  description?: string
  
  @IsOptional()
  @IsNumber()
  increaseHeat?: number
  
  @IsOptional()
  @IsArray()
  categories?: number[]
}

export class BookmarksCreateDto {
  @IsString()
  @MaxLength(TITLE_MAX_LIMIT)
  @MinLength(TITLE_MIN_LIMIT)
  name: string
  
  @IsUrl()
  @MaxLength(URL_MAX_LIMIT)
  url: string
  
  @IsOptional()
  @IsString()
  @MaxLength(DESC_MAX_LIMIT)
  description?: string
  
  @IsOptional()
  @IsArray()
  categories?: number[]
}

export class BookmarksQueryDto extends PaginationDto {
  @IsOptional()
  @MaxLength(KEYWORD_MAX_LIMIT)
  @IsString()
  keyword?: string;
}
