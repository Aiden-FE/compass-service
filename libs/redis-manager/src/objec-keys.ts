/**
 * @description 验证码key
 * @param {'email' | 'sms'} type 验证码类型
 * @param {string} account 对应的email或手机账号
 * @return {string} 验证码的值
 */
export const CAPTCHA_REDIS_KEY = 'captcha/:type/:account';

/**
 * @description 人机验证结果
 * @param hash 根据token生成的唯一hash
 * @return {boolean} 是否通过
 */
export const RECAPTCHA_REDIS_KEY = 'captcha/recaptcha/:hash';

/**
 * @description 标记为已发送状态,激活状态不允许再次发送验证码
 * @param account 邮箱账号
 * @return {true} 有值即锁定
 */
export const EMAIL_CAPTCHA_LOCKED_REDIS_KEY = 'captcha/email/locked/:account';
