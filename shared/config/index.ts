import { CompassEnv } from '@shared/config/env-keys';

export * from './env-keys';
export * from './limits';
export * from './constants';

export const DEFAULT_PAGE_NUM = 0;

export const DEFAULT_PAGE_SIZE = 9999;

export const validationOption = {
  transform: true, // 转换数据
  whitelist: true, // 剥离装饰器不验证的项目
  stopAtFirstError: true, // 遇见第一个错误时就停止验证
  // skipMissingProperties: true, // 跳过未定义或定义null的验证
  // disableErrorMessages: true, // 禁用详细错误信息
};

/**
 * @description 环境变量默认值
 */
export const envDefaultValues = {
  [CompassEnv.NODE_ENV]: 'development',
  [CompassEnv.JWT_EXPIRES]: '14d',
  [CompassEnv.LISTEN_PORT]: '8080',
  [CompassEnv.THROTTLER_TTL]: '60',
  [CompassEnv.THROTTLER_LIMIT]: '20',
};

/** FIXME: 系统邮件地址, 请替换为实际业务地址 */
export const SYSTEM_EMAIL_FROM = 'aiden_fe@outlook.com';
