/**
 * @description 邮件邀请注册模板
 * @param context 发件人代号标识
 * @param code 验证码
 */
export const EMAIL_CAPTCHA_TEMPLATE = `
  <div>{{ context }}:</div>
  <div>您正在请求邮箱验证码,如果不是您本人申请,请忽略此邮件!</div>
  验证码五分钟内有效,您的验证码是: <strong style="font-size: 18px">{{ code }}</strong>
`;
