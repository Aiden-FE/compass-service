import { Injectable } from '@nestjs/common';
import { DBService } from '@app/db';
import {
  CompassEnv,
  encodeMD5,
  getEnv,
  GoogleRecaptchaRequest,
  HttpResponse,
  replaceVariablesInString,
  ResponseCode,
  SYSTEM_EMAIL_ADDRESS,
  verifyRecaptcha,
} from '@shared';
import { CAPTCHA_REDIS_KEY, RedisManagerService } from '@app/redis-manager';
import { random } from 'lodash';
import { EMAIL_CAPTCHA_TEMPLATE } from '@app/email/templates';
import { EmailService } from '@app/email';
import { EMailLoginDto, TelephoneLoginDto } from './oauth.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class OauthService {
  constructor(
    private dbService: DBService,
    private userService: UserService,
    private redisService: RedisManagerService,
    private emailService: EmailService,
  ) {}

  async sendEmailCaptcha(data: { email: string }) {
    const code = random(100000, 999999);
    // 将code码记入缓存
    await this.redisService.set(CAPTCHA_REDIS_KEY, String(code), {
      params: { type: 'email', account: data.email },
    });
    // 发出邮件
    return this.emailService.sendMail({
      from: SYSTEM_EMAIL_ADDRESS,
      to: data.email,
      subject: '邮箱验证',
      html: replaceVariablesInString(EMAIL_CAPTCHA_TEMPLATE, {
        context: 'Compass Service',
        code: code.toString(),
      }),
    });
  }

  /**
   * @description 验证 recaptcha token
   * @param token
   * @param ip
   * @param option
   */
  // eslint-disable-next-line class-methods-use-this
  async verifyRecaptchaToken(
    token: string,
    ip?: string,
    option = {
      score: 0.9,
    },
  ) {
    // dev环境始终放开
    if (getEnv(CompassEnv.NODE_ENV) === 'development') {
      return;
    }
    const params: GoogleRecaptchaRequest = {
      secret: getEnv(CompassEnv.RECAPTCHA_SECRET),
      response: token,
      remoteip: ip,
    };
    const result = await verifyRecaptcha(params);
    // 如果验证不通过则直接返回响应
    if (!result.success || result.score > (option.score || 0.9)) {
      throw new HttpResponse(null, {
        statusCode: ResponseCode.FORBIDDEN,
        message: result['error-codes']?.length ? result['error-codes'].join(';') : '验证失败',
      });
    }
  }

  async validateLogin(body: EMailLoginDto | TelephoneLoginDto) {
    const isEmailLogin = !!(body as EMailLoginDto).email;

    const sentCaptcha = await this.redisService.get(CAPTCHA_REDIS_KEY, {
      params: {
        type: isEmailLogin ? 'email' : 'sms',
        account: isEmailLogin ? (body as EMailLoginDto).email : (body as TelephoneLoginDto).telephone,
      },
    });

    if (!sentCaptcha) {
      throw new HttpResponse(null, {
        statusCode: ResponseCode.FORBIDDEN,
        message: '请先获取验证码',
      });
    }

    if (sentCaptcha !== body.captcha) {
      throw new HttpResponse(null, {
        statusCode: ResponseCode.FORBIDDEN,
        message: '验证码错误',
      });
    }

    const query: Partial<EMailLoginDto | TelephoneLoginDto> = { password: encodeMD5(body.password) };

    if (isEmailLogin) {
      (query as EMailLoginDto).email = (body as EMailLoginDto).email;
    } else {
      (query as TelephoneLoginDto).telephone = (body as TelephoneLoginDto).telephone;
    }

    const user = await this.userService.findUser(query);

    if (!user) {
      throw new HttpResponse(null, {
        statusCode: ResponseCode.FORBIDDEN,
        message: '账号或密码错误',
      });
    }

    return user;
  }
}
