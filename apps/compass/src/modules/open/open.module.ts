import { Module } from '@nestjs/common';
import { SMSModule } from '@libs/sms';
import { EmailModule } from '@libs/email';
import { OpenController } from './open.controller';
import { OpenService } from './open.service';

@Module({
  imports: [
    SMSModule.forRoot({
      accessKeyId: process.env.ALI_CLOUD_SMS_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALI_CLOUD_SMS_ACCESS_KEY_SECRET,
    }),
    EmailModule.forRoot({
      auth: {
        user: process.env.MY_EMAIL_AUTH_USER,
        pass: process.env.MY_EMAIL_AUTH_PASSWORD,
      },
    }),
  ],
  controllers: [OpenController],
  providers: [OpenService],
})
export class OpenModule {}
