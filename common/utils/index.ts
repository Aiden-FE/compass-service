import {PaginationDto} from "@common/interface";
import {DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE} from "@common/config";

/**
 * @description 包装分页查询参数,确保查询参数正确
 * @param pagination
 */
export function wrapPaginationQuery (pagination: PaginationDto) {
  const result = {
    skip: DEFAULT_PAGE_NUM,
    take: DEFAULT_PAGE_SIZE
  }
  if (pagination.pageSize) {
    result.take = Number(pagination.pageSize)
  }
  if (pagination.pageNum !== undefined) {
    result.skip = pagination.pageNum * result.take
  }
  return result
}

/**
 * @description 构造分页数据响应
 */
export class PaginationResponse <T = unknown>{
  pageNum: number
  pageSize: number
  total: number
  result: T[]
  
  constructor(
    result: T[],
    pagination: PaginationDto,
    total: number
  ) {
    this.pageNum = pagination.pageNum ? Number(pagination.pageNum) : DEFAULT_PAGE_NUM
    this.pageSize = pagination.pageSize ? Number(pagination.pageSize) : DEFAULT_PAGE_SIZE
    this.total = total
    this.result = result
  }
}
