import {IsOptional, MaxLength, MinLength} from 'class-validator';

export class PermissionCreateDto {
  @MaxLength(128)
  @MinLength(2)
  key: string;

  @MaxLength(24)
  @MinLength(2)
  name: string;

  @IsOptional()
  @MaxLength(255)
  description?: string;
}

export class PermissionUpdateDto {
  @IsOptional()
  @MaxLength(24)
  @MinLength(2)
  name?: string;
  
  @IsOptional()
  @MaxLength(255)
  description?: string;
}
