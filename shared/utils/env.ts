import '../plugins/dotenv.plugin';

let defaultEnvValues: Record<string, string> = {};

// 设置环境变量默认值
export function setDefaultEnvValues(values: Record<string, string>) {
  defaultEnvValues = {
    ...defaultEnvValues,
    ...values,
  };
}

export function getEnv(key: string, defaultValue: string = ''): string {
  let val = process.env[key];
  if (val !== undefined) return val;
  val = defaultValue[key];
  if (val !== undefined) return val;
  return defaultValue;
}
