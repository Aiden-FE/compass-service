import { Module } from '@nestjs/common';
import { OpenController } from './open.controller';
import { OpenService } from './open.service';
import {SMSModule} from "@libs/sms";

@Module({
  imports: [
    SMSModule.forRoot({
      accessKeyId: process.env.ALI_CLOUD_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALI_CLOUD_ACCESS_KEY_SECRET,
    })
  ],
  controllers: [OpenController],
  providers: [OpenService]
})
export class OpenModule {}
