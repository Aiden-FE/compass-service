import '../plugins/dotenv.plugin';
import { ENV_KEYS } from '@shared/config';

let defaultEnvValues: Record<string, string> = {};

// 设置环境变量默认值
export function setDefaultEnvValues(values: Record<string, string>) {
  defaultEnvValues = {
    ...defaultEnvValues,
    ...values,
  };
}

export function getEnv(key: ENV_KEYS, defaultValue: string = ''): string {
  let val = process.env[key];
  if (val !== undefined) return val;
  val = defaultValue[key];
  if (val !== undefined) return val;
  return defaultValue;
}
