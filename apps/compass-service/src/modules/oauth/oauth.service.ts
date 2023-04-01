import { Injectable } from '@nestjs/common';
import { DBService } from '@app/db';
import { HttpResponse, ResponseCode } from '@shared';
import { RedisManagerService, CAPTCHA_REDIS_KEY } from '@app/redis-manager';
import { UserService } from '../user/user.service';
import { EMailLoginDto, TelephoneLoginDto } from './oauth.dto';

@Injectable()
export class OauthService {
  constructor(
    private dbService: DBService,
    private userService: UserService,
    private redisService: RedisManagerService,
  ) {}

  async validateLogin(body: EMailLoginDto | TelephoneLoginDto) {
    const isEmailLogin = !!(body as EMailLoginDto).email;
    const user = await this.userService.findUser(body);

    if (!user) {
      return new HttpResponse(null, {
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
      return new HttpResponse(null, {
        statusCode: ResponseCode.ERROR,
        message: '验证码错误',
      });
    }

    return user;
  }
}
