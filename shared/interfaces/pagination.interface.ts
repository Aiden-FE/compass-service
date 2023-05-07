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

/**
 * @description 包装分页查询参数,确保查询参数正确
 * @param pagination
 */
export function PaginationParams(pagination?: PaginationRequestFromURLDto | PaginationRequestFromBodyDto) {
  const result = {
    skip: DEFAULT_PAGE_NUM,
    take: pagination.pageSize ? Number(pagination.pageSize) : DEFAULT_PAGE_SIZE,
    pageNum: pagination.pageNum ? Number(pagination.pageNum) : DEFAULT_PAGE_NUM,
    pageSize: pagination.pageSize ? Number(pagination.pageSize) : DEFAULT_PAGE_SIZE,
  };
  result.skip = result.pageNum * result.take;
  return result;
}

export class PaginationResponse<DataItem = unknown> {
  public list: DataItem[];

  public pageNum: number;

  public pageSize: number;

  public total: number;

  constructor(data?: { list?: DataItem[]; pageNum?: number; pageSize?: number; total?: number }) {
    this.list = data?.list || [];
    this.total = data?.total || 0;
    this.pageNum = data?.pageNum || DEFAULT_PAGE_NUM;
    this.pageSize = data?.pageSize || DEFAULT_PAGE_SIZE;
  }
}
