import { Module } from '@nestjs/common';
import { EmailModule } from '@app/email';
import { CompassEnv, getEnv } from '@shared';
import { DBService } from '@app/db';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import JwtStrategy from '@shared/utils/jwt.strategy';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

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
  providers: [OauthService, DBService, JwtStrategy],
})
export class OauthModule {}
