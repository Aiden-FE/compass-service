import { KEYWORD_MAX_LIMIT, PaginationDto, PermissionsEnum } from '@common';
import {
  IsArray,
  IsNotEmpty, IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RolesCreateDto {
  @MaxLength(24)
  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @MaxLength(255)
  description?: string;
  
  @IsOptional()
  @IsArray()
  permissions?: PermissionsEnum[];
}

export class RolesUpdateDto {
  @IsOptional()
  @MaxLength(24)
  @MinLength(2)
  name?: string;
  
  @IsOptional()
  @MaxLength(255)
  description?: string;
  
  @IsOptional()
  @IsArray()
  permissions?: PermissionsEnum[];
}

export class RolesListQueryDto extends PaginationDto {
  @IsOptional()
  @MaxLength(KEYWORD_MAX_LIMIT)
  @IsString()
  keyword?: string;
}
