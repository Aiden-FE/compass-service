import { IsArray, IsString, MaxLength, MinLength, IsOptional } from 'class-validator';
import { DESC_MAX_LIMIT, TITLE_MAX_LIMIT, TITLE_MIN_LIMIT } from '@shared';

export class RoleCreateDto {
  @IsString()
  @MaxLength(TITLE_MAX_LIMIT)
  @MinLength(TITLE_MIN_LIMIT)
  name: string;

  @IsOptional()
  @MaxLength(DESC_MAX_LIMIT)
  description?: string;

  @IsOptional()
  @IsArray()
  permissions?: string[];
}
