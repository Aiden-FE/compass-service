import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpResponse, Public, ResponseCode, validateMultipleDto } from '@shared';
import { EmailService } from '@app/email';
import { CAPTCHA_REDIS_KEY, RedisManagerService } from '@app/redis-manager';
import { EMailLoginDto, EmailRegisterDto, TelephoneLoginDto, ValidAndSendEmailCodeDto } from './oauth.dto';
import { OauthService } from './oauth.service';
import { UserService } from '../user/user.service';

@Controller('oauth')
export class OauthController {
  constructor(
    private jwtService: JwtService,
    private oauthService: OauthService,
    private userService: UserService,
    private emailService: EmailService,
    private redisService: RedisManagerService,
  ) {}

  @Public()
  @Post('captcha/email')
  async emailRegister(@Body() body: ValidAndSendEmailCodeDto) {
    await this.oauthService.verifyRecaptchaToken(body.token);
    await this.oauthService.sendEmailCaptcha({ email: body.email });
    return '验证码发送成功';
  }

  @Public()
  @Post('register/email')
  async verifyRecaptcha(@Body() body: EmailRegisterDto) {
    // 读取验证码
    const code = await this.redisService.get(CAPTCHA_REDIS_KEY, {
      params: { type: 'email', account: body.email },
    });
    if (!code) {
      return new HttpResponse(null, {
        message: '请先获取验证码',
        statusCode: ResponseCode.FORBIDDEN,
      });
    }
    if (code !== body.captcha) {
      return new HttpResponse(null, {
        message: '验证码不正确',
        statusCode: ResponseCode.FORBIDDEN,
      });
    }
    // eslint-disable-next-line no-param-reassign
    delete body.captcha;
    let user = this.userService.findUser({ email: body.email });
    if (user) {
      return new HttpResponse(null, {
        message: '该用户已存在',
        statusCode: ResponseCode.FORBIDDEN,
      });
    }
    user = this.userService.createUser(body);
    if (!user) {
      return new HttpResponse(null, {
        message: '注册失败',
        statusCode: ResponseCode.ERROR,
      });
    }
    // 签发token
    const signStr = this.jwtService.sign(user);
    return new HttpResponse({
      token: signStr,
      ...user,
    });
  }

  @Public()
  @Post('login')
  async login(@Body() body: EMailLoginDto | TelephoneLoginDto) {
    validateMultipleDto(body, [EMailLoginDto, TelephoneLoginDto]);
    const result = await this.oauthService.validateLogin(body);

    const signStr = this.jwtService.sign(result);
    return { ...result, token: signStr };
  }
}
