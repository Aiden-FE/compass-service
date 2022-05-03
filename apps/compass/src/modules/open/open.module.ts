import { Module } from '@nestjs/common';
import { OpenController } from './open.controller';
import { OpenService } from './open.service';
import { SMSModule } from '@libs/sms';
import { EmailModule } from '@libs/email';

@Module({
  imports: [
    SMSModule.forRoot({
      accessKeyId: process.env.ALI_CLOUD_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALI_CLOUD_ACCESS_KEY_SECRET,
    }),
    EmailModule.forRoot({
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASSWORD,
      },
    }),
  ],
  controllers: [OpenController],
  providers: [OpenService],
})
export class OpenModule {}
