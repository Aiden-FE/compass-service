import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY, PERMISSIONS_KEY } from '@shared/config';
import { PermissionsOption } from '@shared';
import { Observable } from 'rxjs';

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    // 使用了 @Public() 装饰器的不做校验
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // 公共接口放行
    if (isPublic) {
      return true;
    }

    // super.logIn(context.switchToHttp().getRequest());
    const callback = await super.canActivate(context);
    // 获取canActivate最终值
    let valid: boolean;
    if (callback === true || callback === false) {
      valid = callback;
    } else if (callback instanceof Promise) {
      valid = await callback;
    } else {
      valid = await (callback as Observable<boolean>).toPromise();
    }
    if (valid === false) {
      return false;
    }
    return this.handleUserPermissions(context);
  }

  private async handleUserPermissions(context: ExecutionContext) {
    // 处理接口所许可的权限
    const permissionsOption = this.reflector.get<PermissionsOption>(PERMISSIONS_KEY, context.getHandler());
    // 如果未使用 @Auth() 装饰器的接口意味着不需要具体权限码授权
    if (!permissionsOption || !permissionsOption.permissions?.length) return true;
    const { user } = context.switchToHttp().getRequest();
    /**
     * FIXME: 这里的user.permissions应该是通过user.roles前往数据库(先查redis内角色的权限缓存通常是个好的选择)聚合权限集并去重得出的
     * 原因在于产线的权限集通常会膨胀的很大,不适合混合在jwt内.
     * user.permissions = await this.getUserPermissions(user.roles);
     */
    // 没有权限则直接拒绝访问
    if (!user || !user.permissions?.length) return false;
    // 或权限处理
    if (permissionsOption.mode === 'OR') {
      return permissionsOption.permissions.some((key) => user.permissions.includes(key));
    }
    // 并集权限处理
    return permissionsOption.permissions.reduce<boolean>((result, key) => {
      if (!result) return false;
      return user.permissions.includes(key);
    }, true);
  }

  /**
   * @description 根据用户具备的角色去聚合所有权限
   * @todo: 这个方法也可以由UserService提供,jwtAuth注入UserService后调用
   * @param roles
   * @private
   */
  // private getUserPermissions(roles: number[]) {
  // }
}
