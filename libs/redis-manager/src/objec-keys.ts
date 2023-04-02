/**
 * @description 验证码key
 * @param {'email' | 'sms'} type 验证码类型
 * @param {string} account 对应的email或手机账号
 */
export const CAPTCHA_REDIS_KEY = 'captcha/:type/:account';
