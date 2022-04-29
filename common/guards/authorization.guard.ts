import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * @description 授权访问的守卫
 */
@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  
  canActivate(context: ExecutionContext): boolean {
    const authorization = this.reflector.get<string[]>(
      'authorization',
      context.getHandler(),
    );
    console.log('authorization: ', authorization)
    return true
  }
}
