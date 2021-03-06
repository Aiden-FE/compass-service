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
  Min, IsOptional,
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

export const Gender: {
  WOMEN: 'WOMEN';
  MEN: 'MEN';
  UNKOWN: 'UNKOWN';
} = {
  WOMEN: 'WOMEN',
  MEN: 'MEN',
  UNKOWN: 'UNKOWN',
};

export type GenderEnum = typeof Gender[keyof typeof Gender];

export class UserPhoneRegisterDto {
  @IsPhoneNumber()
  @MaxLength(TELEPHONE_MAX_LIMIT)
  @MinLength(TELEPHONE_MIN_LIMIT)
  telephone: string;

  @MaxLength(PASSWORD_MAX_LIMIT)
  @MinLength(PASSWORD_MIN_LIMIT)
  password: string;

  @IsOptional()
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
  
  @IsOptional()
  @IsArray()
  roles?: number[];
}

export class UserUpdateDto {
  @IsOptional()
  @MaxLength(NAME_MAX_LIMIT)
  @MinLength(NAME_MIN_LIMIT)
  name?: string;
  
  @IsOptional()
  @MaxLength(NICKNAME_MAX_LIMIT)
  @MinLength(NAME_MIN_LIMIT)
  nickname?: string;
  
  @IsOptional()
  @IsIn(Object.values(Gender))
  gender?: GenderEnum;
  
  @IsOptional()
  @IsDateString()
  birthday?: string;
  
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
  
  @IsOptional()
  @IsArray()
  roles?: number[];
}

export class UserUpdatePrivacyDto {
  @IsOptional()
  @IsPhoneNumber()
  @MaxLength(TELEPHONE_MAX_LIMIT)
  @MinLength(TELEPHONE_MIN_LIMIT)
  telephone?: string;
  
  @IsOptional()
  @MaxLength(PASSWORD_MAX_LIMIT)
  @MinLength(PASSWORD_MIN_LIMIT)
  password?: string;
  
  @IsOptional()
  @IsEmail()
  email?: string;
  
  @IsOptional()
  @IsNumber()
  @Max(CAPTCHA_NUMBER_MAX_LIMIT)
  @Min(CAPTCHA_NUMBER_MIN_LIMIT)
  emailCaptcha?: number;
  
  @IsOptional()
  @IsNumber()
  @Max(CAPTCHA_NUMBER_MAX_LIMIT)
  @Min(CAPTCHA_NUMBER_MIN_LIMIT)
  smsCaptcha?: number;
}

export class UsersLoginDto extends UserUpdatePrivacyDto {}

export class UsersListQueryDto extends PaginationDto {
  @IsOptional()
  @MaxLength(KEYWORD_MAX_LIMIT)
  @IsString()
  keyword?: string;
}

export type UserModel = {
  id: string;
  password: string;
  telephone: string | null;
  email: string | null;
  name: string | null;
  nickname: string | null;
  gender: GenderEnum | null;
  birthday: Date | null;
  enabled: boolean | null;
  lastLoginTime: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
