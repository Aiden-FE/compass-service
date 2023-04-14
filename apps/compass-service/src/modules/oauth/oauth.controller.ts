import { Body, Controller, Logger, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encodeMD5, HttpResponse, Public, ResponseCode, validateMultipleDto } from '@shared';
import { EmailService } from '@app/email';
import {
  CAPTCHA_REDIS_KEY,
  EMAIL_CAPTCHA_LOCKED_REDIS_KEY,
  RECAPTCHA_REDIS_KEY,
  RedisManagerService,
} from '@app/redis-manager';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  EMailLoginDto,
  EmailRegisterDto,
  TelephoneLoginDto,
  ValidAndSendEmailCodeDto,
  ValidateRecaptchaDto,
} from './oauth.dto';
import { OauthService } from './oauth.service';
import { UserService } from '../user/user.service';
import { APP_LOG_CONTEXT } from '../../config';

@ApiTags('开放授权')
@Controller('oauth')
export class OauthController {
  constructor(
    private jwtService: JwtService,
    private oauthService: OauthService,
    private userService: UserService,
    private emailService: EmailService,
    private redisService: RedisManagerService,
  ) {}

  @ApiOperation({
    summary: '人机验证',
    description: '当web网站通过website key获取到来自谷歌的解析token后提供给本接口进行可用性验证',
  })
  @Public()
  @Post('recaptcha/validate')
  async validateRecaptcha(@Body() body: ValidateRecaptchaDto) {
    try {
      await this.oauthService.verifyRecaptchaToken(body.token);
      const hash = encodeMD5(body.token);
      this.redisService.set(RECAPTCHA_REDIS_KEY, 'true', { params: { hash } });
      return hash;
    } catch (err) {
      return new HttpResponse(false, { statusCode: ResponseCode.BAD_REQUEST });
    }
  }

  @ApiOperation({
    summary: '发送邮箱验证码',
  })
  @Public()
  @Post('captcha/email')
  async emailRegister(@Body() body: ValidAndSendEmailCodeDto) {
    const result = await this.redisService.get(RECAPTCHA_REDIS_KEY, { params: { hash: body.token } });
    if (!result || result !== 'true') {
      return new HttpResponse(false, {
        statusCode: ResponseCode.FORBIDDEN,
        message: '人机验证验证结果异常,请重新进行人机验证',
      });
    }
    if (await this.redisService.get(EMAIL_CAPTCHA_LOCKED_REDIS_KEY, { params: { account: body.email } })) {
      return new HttpResponse(false, {
        statusCode: ResponseCode.FORBIDDEN,
        message: '请勿频繁发送验证码',
      });
    }
    await this.oauthService.sendEmailCaptcha({ email: body.email });
    // 一分钟锁定,防止重复发送
    await this.redisService.set(EMAIL_CAPTCHA_LOCKED_REDIS_KEY, 'true', {
      params: { account: body.email },
      expiresIn: 1000 * 60,
    });
    return new HttpResponse(null, { message: '验证码发送成功' });
  }

  @ApiOperation({
    summary: '邮箱注册',
  })
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
    let user = await this.userService.findUser({ email: body.email });
    if (user) {
      return new HttpResponse(null, {
        message: '该用户已存在',
        statusCode: ResponseCode.FORBIDDEN,
      });
    }
    user = await this.userService.createUser(body);
    if (!user) {
      return new HttpResponse(null, {
        message: '注册失败',
        statusCode: ResponseCode.BAD_REQUEST,
      });
    }
    // 签发token
    const signStr = this.jwtService.sign(user);
    return new HttpResponse({
      token: signStr,
      ...user,
    });
  }

  @ApiOperation({
    summary: '登录',
    description: '可通过手机号或者邮箱账号进行登录',
  })
  @Public()
  @Post('login')
  async login(@Body() body: EMailLoginDto | TelephoneLoginDto) {
    validateMultipleDto(body, [EMailLoginDto, TelephoneLoginDto]);
    const result = await this.oauthService.validateLogin(body);
    try {
      await this.userService.updateUser(result.id, { lastLoginTime: new Date() });
    } catch (e) {
      Logger.warn(e, APP_LOG_CONTEXT);
    }
    const signStr = this.jwtService.sign(result);
    return { ...result, token: signStr };
  }
}
