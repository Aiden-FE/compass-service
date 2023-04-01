import { SetMetadata, applyDecorators } from '@nestjs/common';
import { PERMISSIONS, AUTH_KEY, AuthOption } from '@shared';
import { ApiBearerAuth } from '@nestjs/swagger';

/**
 * @description 设置许可权限
 * @param permissions 权限key或keys
 * @param mode 权限模式,OR 任一命中即可, AND所有均需满足
 * @constructor
 */
const Auth = (permissions: PERMISSIONS, mode: AuthOption['mode'] = 'AND') => {
  return applyDecorators(
    SetMetadata(AUTH_KEY, {
      mode,
      permissions: Array.isArray(permissions) ? permissions : [permissions],
    }),
    ApiBearerAuth(),
  );
};

export default Auth;
