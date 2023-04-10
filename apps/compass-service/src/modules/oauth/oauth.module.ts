import { Module } from '@nestjs/common';
import { EmailModule } from '@app/email';
import { CompassEnv, getEnv, JwtStrategy } from '@shared';
import { DBService } from '@app/db';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RedisManagerService } from '@app/redis-manager';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { UserService } from '../user/user.service';

const importModules = [];
const emailUser = getEnv(CompassEnv.EMAIL_USER);
const emailPassword = getEnv(CompassEnv.EMAIL_PASSWORD);

if (emailUser && emailPassword) {
  importModules.push(
    // 请按需配置
    EmailModule.forRoot({
      service: 'outlook365',
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    }),
  );
}

@Module({
  imports: [
    ...importModules,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      global: true,
      secret: getEnv(CompassEnv.JWT_SECRET),
      signOptions: { expiresIn: getEnv(CompassEnv.JWT_EXPIRES) },
    }),
  ],
  controllers: [OauthController],
  providers: [OauthService, DBService, RedisManagerService, JwtStrategy, UserService],
})
export class OauthModule {}
