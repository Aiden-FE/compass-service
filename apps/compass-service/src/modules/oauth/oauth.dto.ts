import { IsEmail, IsNumberString, IsPhoneNumber, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { PASSWORD_MAX_LIMIT, PASSWORD_MIN_LIMIT, SMS_LENGTH_LIMIT } from '@shared';

class AbstractLoginDto {
  @MaxLength(PASSWORD_MAX_LIMIT)
  @MinLength(PASSWORD_MIN_LIMIT)
  password: string;

  @IsNumberString()
  @Length(SMS_LENGTH_LIMIT)
  captcha: string;
}

export class TelephoneLoginDto extends AbstractLoginDto {
  @IsPhoneNumber()
  telephone: string;
}

export class EMailLoginDto extends AbstractLoginDto {
  @IsEmail()
  email: string;
}

export class ValidateRecaptchaDto {
  /** google人机验证website secret后返回的token */
  @IsString()
  token: string;
}

// 人机验证并发送邮件验证码
export class ValidAndSendEmailCodeDto {
  /** server人机验证通过后返回的hash token */
  @IsString()
  token: string;

  @IsEmail()
  email: string;
}

// 邮件注册
export class EmailRegisterDto {
  @IsEmail()
  email: string;

  @MaxLength(PASSWORD_MAX_LIMIT)
  @MinLength(PASSWORD_MIN_LIMIT)
  password: string;

  @IsNumberString()
  @Length(SMS_LENGTH_LIMIT)
  captcha: string;
}

// 微信登录
export class WechatLoginDto {
  @IsString()
  code: string;
}

// 微信授权响应数据
export interface WechatAuthInfo {
  openid?: string;
  session_key?: string;
  errmsg?: string;
  errcode?: number;
}
