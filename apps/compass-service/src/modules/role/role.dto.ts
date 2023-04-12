import { IsArray, IsString, MaxLength, MinLength } from 'class-validator';
import { DESC_MAX_LIMIT, TITLE_MAX_LIMIT, TITLE_MIN_LIMIT } from '@shared';
import { Optional } from '@nestjs/common';

export class RoleCreateDto {
  @IsString()
  @MaxLength(TITLE_MAX_LIMIT)
  @MinLength(TITLE_MIN_LIMIT)
  name: string;

  @Optional()
  @MaxLength(DESC_MAX_LIMIT)
  description?: string;

  @Optional()
  @IsArray()
  permissions?: string[];
}
