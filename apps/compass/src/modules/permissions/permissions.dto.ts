import { MaxLength, MinLength } from 'class-validator';

export class PermissionCreateDto {
  @MaxLength(128)
  @MinLength(2)
  key: string;
  @MaxLength(24)
  @MinLength(2)
  name: string;
  @MaxLength(255)
  description?: string;
}

export class PermissionUpdateDto {
  @MaxLength(24)
  @MinLength(2)
  name?: string;
  @MaxLength(255)
  description?: string;
}
