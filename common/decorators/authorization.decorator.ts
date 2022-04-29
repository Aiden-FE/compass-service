import { SetMetadata } from '@nestjs/common';
import {toArray, PermissionsEnum} from "@common";

/**
 * @description 设置许可权限
 * @param permissions 权限key或keys
 * @param mode 权限模式,OR 任一命中即可, AND所有均需满足
 * @constructor
 */
export const Authorization = (permissions: PermissionsEnum, mode: 'OR' | 'AND' = 'OR') => {
  return SetMetadata('authorization', {
    mode,
    permissions: toArray(permissions),
  })
}
