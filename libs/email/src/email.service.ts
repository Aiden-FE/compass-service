import { Injectable, Logger } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { EmailMailOption, EmailTransporter, EmailTransportParams } from './email.dto';

@Injectable()
export class EmailService {
  private transporter: EmailTransporter;

  constructor(private option: EmailTransportParams[0], defaultOption?: EmailTransportParams[1]) {
    this.transporter = this.createTransporter(option, defaultOption);
    Logger.log('Mail service is ready', 'MailService');
  }

  public sendMail(option: EmailMailOption) {
    return this.transporter.sendMail({
      ...option,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private createTransporter(option: EmailTransportParams[0], defaultOption?: EmailTransportParams[1]) {
    return createTransport(option, defaultOption);
  }
}
