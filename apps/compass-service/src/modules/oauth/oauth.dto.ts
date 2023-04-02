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

// 人机验证并发送邮件验证码
export class ValidAndSendEmailCodeDto {
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
