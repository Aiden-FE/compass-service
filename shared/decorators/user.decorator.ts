import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @description 获取用户信息
 * @param {string} [userKey] 获取指定属性
 */
const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { user } = request;

  return data ? user?.[data] : user;
});

export default User;
