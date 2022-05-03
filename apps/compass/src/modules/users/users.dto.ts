import {
  IsArray,
  IsPhoneNumber,
  MaxLength,
  MinLength,
  IsIn,
  IsDateString,
  IsBoolean,
  IsEmail,
  IsString,
  IsNumber,
  Max,
  Min,
} from 'class-validator';
import {
  CAPTCHA_NUMBER_MAX_LIMIT,
  CAPTCHA_NUMBER_MIN_LIMIT,
  EMAIL_MAX_LIMIT,
  EMAIL_MIN_LIMIT,
  KEYWORD_MAX_LIMIT,
  NAME_MAX_LIMIT,
  NAME_MIN_LIMIT,
  NICKNAME_MAX_LIMIT,
  PaginationDto,
  PASSWORD_MAX_LIMIT,
  PASSWORD_MIN_LIMIT,
  TELEPHONE_MAX_LIMIT,
  TELEPHONE_MIN_LIMIT,
} from '@common';
import type { Gender } from '@prisma/client';
import { Gender as GenderEnum } from '@prisma/client';

export class UserPhoneRegisterDto {
  @IsPhoneNumber()
  @MaxLength(TELEPHONE_MAX_LIMIT)
  @MinLength(TELEPHONE_MIN_LIMIT)
  telephone: string;
  @MaxLength(PASSWORD_MAX_LIMIT)
  @MinLength(PASSWORD_MIN_LIMIT)
  password: string;
  @IsArray()
  roles?: number[];
}

export class UserEmailRegisterDto {
  @IsEmail()
  @MaxLength(EMAIL_MAX_LIMIT)
  @MinLength(EMAIL_MIN_LIMIT)
  email: string;
  @MaxLength(PASSWORD_MAX_LIMIT)
  @MinLength(PASSWORD_MIN_LIMIT)
  password: string;
  @IsNumber()
  @Max(CAPTCHA_NUMBER_MAX_LIMIT)
  @Min(CAPTCHA_NUMBER_MIN_LIMIT)
  emailCaptcha: number;
  @IsArray()
  roles?: number[];
}

export class UserUpdateDto {
  @MaxLength(NAME_MAX_LIMIT)
  @MinLength(NAME_MIN_LIMIT)
  name?: string;
  @MaxLength(NICKNAME_MAX_LIMIT)
  @MinLength(NAME_MIN_LIMIT)
  nickname?: string;
  @IsIn(Object.values(GenderEnum))
  gender?: Gender;
  @IsDateString()
  birthday?: string;
  @IsBoolean()
  enabled?: boolean;
  @IsArray()
  roles?: number[];
}

export class UserUpdatePrivacyDto {
  @IsPhoneNumber()
  @MaxLength(TELEPHONE_MAX_LIMIT)
  @MinLength(TELEPHONE_MIN_LIMIT)
  telephone?: string;
  @MaxLength(PASSWORD_MAX_LIMIT)
  @MinLength(PASSWORD_MIN_LIMIT)
  password?: string;
  @IsEmail()
  email?: string;
  @IsNumber()
  @Max(CAPTCHA_NUMBER_MAX_LIMIT)
  @Min(CAPTCHA_NUMBER_MIN_LIMIT)
  emailCaptcha?: number;
  @IsNumber()
  @Max(CAPTCHA_NUMBER_MAX_LIMIT)
  @Min(CAPTCHA_NUMBER_MIN_LIMIT)
  smsCaptcha?: number;
}

export class UsersLoginDto extends UserUpdatePrivacyDto {}

export class UsersListQueryDto extends PaginationDto {
  @MaxLength(KEYWORD_MAX_LIMIT)
  @IsString()
  keyword?: string;
}
