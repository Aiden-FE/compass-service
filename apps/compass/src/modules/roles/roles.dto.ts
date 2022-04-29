import {PermissionsEnum} from "@common";
import {IsArray, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class RolesCreateDto {
  @MaxLength(24)
  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  name: string
  
  @MaxLength(255)
  description?: string
  
  @IsArray()
  permissions?: PermissionsEnum[]
}
