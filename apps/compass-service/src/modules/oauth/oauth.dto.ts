import { IsEmail, IsNumberString, IsPhoneNumber, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { PASSWORD_MAX_LIMIT, PASSWORD_MIN_LIMIT, SMS_LENGTH_LIMIT } from '@shared';

class AbstractLoginDto {
  @MaxLength(PASSWORD_MAX_LIMIT)
  @MinLength(PASSWORD_MIN_LIMIT)
  password: string;

  @IsNumberString()
  @Length(SMS_LENGTH_LIMIT)
  captcha: string;

  @IsString()
  token: string;
}

export class TelephoneLoginDto extends AbstractLoginDto {
  @IsPhoneNumber()
  telephone: string;
}

export class EMailLoginDto extends AbstractLoginDto {
  @IsEmail()
  email: string;
}

export interface GoogleRecaptchaRequest {
  secret: string;
  response: string;
  remoteip?: string;
}

export interface GoogleRecaptchaResponse {
  success: boolean; // whether this request was a valid reCAPTCHA token for your site
  score: number; // the score for this request (0.0 - 1.0)
  action: string; // the action name for this request (important to verify)
  challenge_ts: string; // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  hostname: string; // the hostname of the site where the reCAPTCHA was solved
  'error-codes'?: (
    | 'missing-input-secret'
    | 'invalid-input-secret'
    | 'missing-input-response'
    | 'invalid-input-response'
    | 'bad-request'
    | 'timeout-or-duplicate'
  )[]; // optional https://developers.google.com/recaptcha/docs/verify#error_code_reference
}
