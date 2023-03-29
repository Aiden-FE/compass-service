import * as allEnvKeys from './env-keys';

export * from './env-keys';

export type ENV_KEYS = keyof typeof allEnvKeys;

export const DEFAULT_PAGE_NUM = 0;

export const DEFAULT_PAGE_SIZE = 9999;
