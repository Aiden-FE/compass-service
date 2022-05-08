import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { EmailConstructor, EmailSendOptions } from './email.dto';

@Injectable()
export class EmailService {
  private transporter: any;

  constructor(private options: EmailConstructor) {
    this.transporter = this.createTransporter(options);
  }

  /**
   * @description 发送电子邮件
   * @param options
   */
  sendEmail(options: EmailSendOptions): Promise<any> {
    return this.transporter.sendMail({
      from: this.options.auth.user,
      ...options,
    });
  }

  private createTransporter(options: EmailConstructor) {
    return createTransport({
      service: 'outlook365',
      ...options,
    });
  }
}
