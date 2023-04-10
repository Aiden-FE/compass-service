import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE } from '@shared/config';
import { PaginationRequestFromURLDto } from '@shared/interfaces';

export * from './env';
export { default as JwtStrategy } from './jwt.strategy';
export { default as validateMultipleDto } from './validate-mutille-dto';
export * from './cryptographic';

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

export function replaceStringParams(str: string, params: Record<string, string>) {
  return Object.keys(params).reduce((lastStr, currentKey) => {
    const currentValue = params[currentKey];
    const reg = new RegExp(`:${currentKey}`, 'g');
    return lastStr.replace(reg, currentValue);
  }, str);
}

/**
 * @param templateString 'test {{ name }} test'
 * @param params
 */
export function replaceVariablesInString(templateString: string, params: Record<string, string>) {
  return Object.keys(params).reduce((lastString, currentKey) => {
    const currentValue = params[currentKey];
    // eslint-disable-next-line no-useless-escape
    const reg = new RegExp(`{{[\s\x20]*(${currentKey})[\s\x20]*}}`, 'g');
    // eslint-disable-next-line no-param-reassign
    lastString = lastString.replace(reg, currentValue);
    return lastString;
  }, templateString);
}
