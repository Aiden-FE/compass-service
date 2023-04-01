/**
 * @description 验证码key
 * @param {'email' | 'sms'} type 验证码类型
 * @param {string} uid 用户id
 */
export const CAPTCHA_REDIS_KEY = 'captcha/:type/:uid';
