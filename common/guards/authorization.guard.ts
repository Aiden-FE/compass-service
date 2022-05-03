import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from "express"
import {AuthorizationOptions} from "@common";

/**
 * @description 授权访问的守卫
 */
@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  
  canActivate(context: ExecutionContext): boolean {
    const authorization = this.reflector.get<AuthorizationOptions>(
      'authorization',
      context.getHandler(),
    );
    if (!authorization || !authorization.permissions?.length) return true
    const user = context.switchToHttp().getRequest<Request>().user as any
    if (!user || !user.permissions?.length) return false
    if (authorization.mode === 'OR') {
      return authorization.permissions.some(key => user.permissions.includes(key))
    } else {
      return authorization.permissions.reduce<boolean>((result, key) => {
        if (!result) return false
        return user.permissions.includes(key)
      }, true)
    }
  }
}
