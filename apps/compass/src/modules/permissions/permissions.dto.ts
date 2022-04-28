import {MaxLength, MinLength} from "class-validator";

export type { OwnerApp } from '@prisma/client'

export class PermissionCreateDto {
  @MaxLength(128)
  @MinLength(2)
  key: string
  @MaxLength(24)
  @MinLength(2)
  name: string
  @MaxLength(255)
  description?: string
}

export class PermissionDeleteDto {
  @MaxLength(128)
  @MinLength(2)
  key: string
}

export class PermissionUpdateDto {
  @MaxLength(128)
  @MinLength(2)
  key: string
  @MaxLength(24)
  @MinLength(2)
  name?: string
  @MaxLength(255)
  description?: string
}
