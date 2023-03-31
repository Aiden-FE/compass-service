import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS, PERMISSIONS_KEY, PermissionsOption } from '@shared';

/**
 * @description 设置许可权限
 * @param permissions 权限key或keys
 * @param mode 权限模式,OR 任一命中即可, AND所有均需满足
 * @constructor
 */
const Permissions = (permissions: PERMISSIONS, mode: PermissionsOption['mode'] = 'AND') => {
  return SetMetadata(PERMISSIONS_KEY, {
    mode,
    permissions: Array.isArray(permissions) ? permissions : [permissions],
  });
};

export default Permissions;
