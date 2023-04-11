import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import isObject from 'lodash/isObject';
import uniq from 'lodash/uniq';
import { CompassEnv } from '../config';
import { getEnv } from './env';
import { RoleService } from '../../apps/compass-service/src/modules/role/role.service';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private roleService: RoleService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: getEnv(CompassEnv.JWT_SECRET),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async validate(payload: Record<string, any>): Promise<any> {
    if (!payload.roles || !payload.roles.length) return payload;
    // 这里根据用户所具备的角色去获取所有权限
    const roleIds: number[] = payload.roles.map((role) =>
      isObject(role) ? (role as { id: number }).id : (role as number),
    );
    const roles = await this.roleService.getRolesByIds(roleIds);
    const permissions = roles
      .map((role) => {
        if (role.permissions) {
          return role.permissions.map((permission) => permission.key);
        }
        return [];
      })
      .flat();
    // 在上下文添加用户的权限信息
    // eslint-disable-next-line no-param-reassign
    payload.permissions = uniq(permissions);
    return payload;
  }
}
