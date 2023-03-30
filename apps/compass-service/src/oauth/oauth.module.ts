import { Module } from '@nestjs/common';
import { EmailModule } from '@app/email';
import { CompassEnv, getEnv } from '@shared';
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
  imports: [...importModules],
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}
