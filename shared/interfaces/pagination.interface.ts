import { Optional } from '@nestjs/common';
import { IsNumber, IsNumberString } from 'class-validator';
import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE } from '@shared';

export class PaginationRequestFromURLDto {
  @Optional()
  @IsNumberString()
  pageNum?: string;

  @Optional()
  @IsNumberString()
  pageSize?: string;
}

export class PaginationRequestFromBodyDto {
  @Optional()
  @IsNumber()
  pageNum?: number;

  @Optional()
  @IsNumber()
  pageSize?: number;
}

export class PaginationResponse<DataItem = unknown> {
  constructor(
    public list: DataItem[] = [],
    public pageNum: number = DEFAULT_PAGE_NUM,
    public pageSize: number = DEFAULT_PAGE_SIZE,
    public total: number = 0,
  ) {}
}
