import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE } from '@shared/config';
import { PaginationRequestFromURLDto } from '@shared/interfaces';

export * from './env';

/**
 * @description 包装分页查询参数,确保查询参数正确
 * @param pagination
 */
export function generatePaginationSQLParams(pagination: PaginationRequestFromURLDto) {
  const result = {
    skip: DEFAULT_PAGE_NUM,
    take: DEFAULT_PAGE_SIZE,
  };
  if (pagination.pageSize) {
    result.take = Number(pagination.pageSize);
  }
  if (pagination.pageNum !== undefined) {
    result.skip = Number(pagination.pageNum) * result.take;
  }
  return result;
}
