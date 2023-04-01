import { Injectable } from '@nestjs/common';
import { DBService } from '@app/db';
import { CompassEnv, getEnv, HttpResponse, ResponseCode } from '@shared';
import { RedisManagerService, CAPTCHA_REDIS_KEY } from '@app/redis-manager';
import { UserService } from '../user/user.service';
import { EMailLoginDto, GoogleRecaptchaRequest, TelephoneLoginDto } from './oauth.dto';

@Injectable()
export class OauthService {
  constructor(
    private dbService: DBService,
    private userService: UserService,
    private redisService: RedisManagerService,
  ) {}

  // eslint-disable-next-line class-methods-use-this
  async verifyRecaptchaToken(token: string, ip?: string) {
    // 将token提交给google Recaptcha服务 POST https://www.google.com/recaptcha/api/siteverify, 国内host换成www.recaptcha.net
    const params: GoogleRecaptchaRequest = {
      secret: getEnv(CompassEnv.RECAPTCHA_SECRET),
      response: token,
      remoteip: ip,
    };
    console.log(params);
    // 如果验证不通过则直接返回响应
    // if (!result.success || success.score > 0.9) {
    //   throw new HttpResponse(null, {
    //     statusCode: ResponseCode.FORBIDDEN,
    //     message: '访问异常,请重试',
    //   });
    // }
  }

  async validateLogin(body: EMailLoginDto | TelephoneLoginDto) {
    const isEmailLogin = !!(body as EMailLoginDto).email;
    const user = await this.userService.findUser({
      email: (body as EMailLoginDto).email,
      telephone: (body as TelephoneLoginDto).telephone,
      password: body.password,
    });

    if (!user) {
      throw new HttpResponse(null, {
        statusCode: ResponseCode.ERROR,
        message: '账号或密码错误',
      });
    }

    const sentCaptcha = await this.redisService.get(CAPTCHA_REDIS_KEY, {
      params: {
        type: isEmailLogin ? 'email' : 'sms',
        uid: user.id,
      },
    });

    if (sentCaptcha !== body.captcha) {
      throw new HttpResponse(null, {
        statusCode: ResponseCode.ERROR,
        message: '验证码错误',
      });
    }

    return user;
  }
}
