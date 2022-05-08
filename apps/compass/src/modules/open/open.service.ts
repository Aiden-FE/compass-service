import { Injectable } from '@nestjs/common';
import { CreateCaptchaDto } from './open.dto';

const svgCaptcha = require('svg-captcha');

@Injectable()
export class OpenService {
  /**
   * @description 创建图片验证码
   * @param options
   */
  createCaptcha(options: CreateCaptchaDto) {
    const params = {
      width: 110,
      height: 40,
      noise: 2,
      background: '#ffffff',
      fontSize: 32,
      ignoreChars: 'Ooli',
      ...options,
    };
    return svgCaptcha.create(params);
  }
}
