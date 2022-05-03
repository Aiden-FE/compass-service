export interface EmailConstructor {
  auth: {
    user: string;
    pass: string;
  };
  /** default = outlook365 */
  service?: string; // 预设的邮件配置
  host?: string;
  port?: number;
  secureConnection?: boolean;
}

export interface EmailSendOptions {
  /** default = EmailConstructor.auth.user */
  from?: string;
  /** 目标邮箱地址 */
  to: string;
  /** 邮件主题 */
  subject: string;
  /** 邮件文本内容 */
  text?: string;
  /** 邮件html内容 */
  html?: string;
  /**
   * @description 附件数组
   * @document https://nodemailer.com/message/attachments/
   */
  attachments?: object[];
}
