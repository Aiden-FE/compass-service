import {
  IsEmail,
  IsNumberString, IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateCaptchaDto {
  @IsOptional()
  @IsNumberString()
  width?: number;
  
  @IsOptional()
  @IsNumberString()
  height?: number;
  
  @IsOptional()
  @IsNumberString()
  fontSize?: number;
  
  @IsOptional()
  @IsNumberString()
  noise?: number;
  
  @IsOptional()
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
