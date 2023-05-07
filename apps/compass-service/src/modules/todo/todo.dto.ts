import {
  DESC_MAX_LIMIT,
  KEYWORD_MAX_LIMIT,
  PaginationRequestFromURLDto,
  TITLE_MAX_LIMIT,
  TITLE_MIN_LIMIT,
} from '@shared';
import { IsBoolean, IsString, MaxLength, MinLength, IsOptional, IsNumber } from 'class-validator';

export class TodoListQueryDto extends PaginationRequestFromURLDto {
  @IsOptional()
  @IsString()
  @MaxLength(KEYWORD_MAX_LIMIT)
  keyword?: string;
}

export class CreateTodoDto {
  @IsString()
  @MaxLength(TITLE_MAX_LIMIT)
  @MinLength(TITLE_MIN_LIMIT)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(DESC_MAX_LIMIT)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isFinished?: boolean;
}

export class ModifyTodoDto extends CreateTodoDto {
  @IsNumber()
  id: number;
}

export class DeleteTodoDto {
  @IsNumber()
  id: number;
}
