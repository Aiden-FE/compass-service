import {Body, Controller, Get, Post, Query, Response, Session} from '@nestjs/common';
import {OpenService} from "./open.service";
import {CreateCaptchaDto, SendSMSCaptchaDto} from "./open.dto";
import {Response as ResponseType} from 'express'
import {ResponseCode, ResponseException} from "@common";
import {AliCloudSMSService} from "@libs/sms";

@Controller('open')
export class OpenController {
  constructor(
    private openService: OpenService,
    private SMSService: AliCloudSMSService,
  ) {
  }
  @Get('captcha')
  captcha (
    @Query() query: CreateCaptchaDto,
    @Session() session: Record<string, string>,
    @Response() res: ResponseType,
  ) {
    const captcha = this.openService.createCaptcha(query)
    session.captchaCode = captcha.text.toLocaleLowerCase();
    res.setHeader('Content-Type', 'image/svg+xml')
    return captcha.data;
  }
  
  @Post('captcha/sms')
  sendSMSCaptcha (
    @Body() body: SendSMSCaptchaDto,
    @Session() session: Record<string, string>,
  ) {
    let phone = body.telephone
    if (phone.startsWith('+')) {
      phone = phone.split(' ')[1]
    }
    if (!session.captchaCode) {
      return new ResponseException({
        status: ResponseCode.NOT_FOUND,
        message: '未找到图形验证码数据'
      })
    }
    if (body.imageCaptcha.toLocaleLowerCase() !== session.captchaCode) {
      return new ResponseException({
        status: ResponseCode.UNAUTHORIZED,
        message: '图形验证码不正确'
      })
    }
    return this.SMSService.sendSMS({
      signName: '阿里云短信测试',
      templateCode: 'SMS_154950909',
      phoneNumbers: phone,
      templateParam: {
        code: '2333'
      }
    })
  }
}
