import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '@shared/config';

export { default as User } from './user.decorator';
export { default as Auth } from './auth.decorator';

/**
 * @description 声明为开放接口,不验证token,不验证权限
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
