import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { CompassEnv } from '../config';
import { getEnv } from './env';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: getEnv(CompassEnv.JWT_SECRET),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async validate(payload: Record<string, any>): Promise<any> {
    return payload;
  }
}
