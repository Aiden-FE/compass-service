import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Response,
  Session,
} from '@nestjs/common';
import { Response as ResponseType } from 'express';
import {
  CAPTCHA_NUMBER_MAX_LIMIT,
  CAPTCHA_NUMBER_MIN_LIMIT,
  IS_PROD,
  ResponseCode, ResponseData,
  ResponseException,
  SessionCompass,
} from '@common';
import { AliCloudSMSService } from '@libs/sms';
import { EmailService } from '@libs/email';
import { random } from 'lodash';
import {
  CreateCaptchaDto,
  SendEmailCaptchaDto,
  SendSMSCaptchaDto,
} from './open.dto';
import { OpenService } from './open.service';

@Controller('open')
export class OpenController {
  constructor(
    private openService: OpenService,
    private SMSService: AliCloudSMSService,
    private emailService: EmailService,
  ) {}

  @Get('captcha')
  captcha(
    @Query() query: CreateCaptchaDto,
    @Session() session: SessionCompass,
    @Response() res: ResponseType,
  ) {
    const captcha = this.openService.createCaptcha(query);
    session.imageCaptcha = captcha.text.toLocaleLowerCase();
    res.setHeader('Content-Type', 'image/svg+xml');
    // eslint-disable-next-line no-console
    if (!IS_PROD) console.info('生成图形验证码: ', session.imageCaptcha);
    return new ResponseData(captcha.data, {
      responseType: 'assets'
    });
  }

  @Post('captcha/sms')
  sendSMSCaptcha(
    @Body() body: SendSMSCaptchaDto,
    @Session() session: SessionCompass,
  ) {
    let phone = body.telephone;
    if (phone.startsWith('+')) {
      // eslint-disable-next-line prefer-destructuring
      phone = phone.split(' ')[1];
    }
    if (!session.imageCaptcha) {
      return new ResponseException({
        status: ResponseCode.NOT_FOUND,
        message: '未找到图形验证码数据',
      });
    }
    if (body.imageCaptcha.toLocaleLowerCase() !== session.imageCaptcha) {
      return new ResponseException({
        status: ResponseCode.UNAUTHORIZED,
        message: '图形验证码不正确',
      });
    }
    return this.SMSService.sendSMS({
      signName: '阿里云短信测试',
      templateCode: 'SMS_154950909',
      phoneNumbers: phone,
      templateParam: {
        code: '2333',
      },
    });
  }

  @Post('captcha/email')
  async sendEmailCaptcha(
    @Body() body: SendEmailCaptchaDto,
    @Session() session: SessionCompass,
  ) {
    if (!session.imageCaptcha) {
      return new ResponseException({
        status: ResponseCode.NOT_FOUND,
        message: '未找到图形验证码数据',
      });
    }
    if (body.imageCaptcha.toLocaleLowerCase() !== session.imageCaptcha) {
      return new ResponseException({
        status: ResponseCode.UNAUTHORIZED,
        message: '图形验证码不正确',
      });
    }
    session.emailCaptcha = random(
      CAPTCHA_NUMBER_MIN_LIMIT,
      CAPTCHA_NUMBER_MAX_LIMIT,
    );
    await this.emailService.sendEmail({
      to: body.email,
      subject: '[指南针] 邮箱注册码',
      html: `
        <p>您正在注册[指南针]邮箱账号,验证码为 <strong>${session.emailCaptcha}</strong> ,五分钟内有效.</p>
        <p>如非您本人注册请勿将验证码透露给他人并忽略此邮件.</p>
      `,
    });
    return true;
  }
}
