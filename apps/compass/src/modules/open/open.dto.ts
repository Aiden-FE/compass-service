import {
  IsEmail,
  IsNumberString,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateCaptchaDto {
  @IsNumberString()
  width?: number;

  @IsNumberString()
  height?: number;

  @IsNumberString()
  fontSize?: number;

  @IsNumberString()
  noise?: number;

  @IsString()
  background?: string;
}

export class SendSMSCaptchaDto {
  @IsPhoneNumber()
  telephone: string;

  @IsString()
  imageCaptcha: string;
}

export class SendEmailCaptchaDto {
  @IsEmail()
  email: string;

  @IsString()
  imageCaptcha: string;
}
