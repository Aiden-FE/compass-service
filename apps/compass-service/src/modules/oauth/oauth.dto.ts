import { IsEmail, IsNumberString, IsPhoneNumber, Length, MaxLength, MinLength } from 'class-validator';
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
