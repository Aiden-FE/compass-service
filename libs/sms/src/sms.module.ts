import { Module } from '@nestjs/common';
import { AliCloudSMSService } from './sms.service';
import { AliCloudSMSConstructor } from './sms.interface';

export * from './sms.interface';

@Module({
  exports: [AliCloudSMSService],
})
export class SMSModule {
  static forRoot(opts: AliCloudSMSConstructor) {
    return {
      module: SMSModule,
      providers: [
        {
          provide: AliCloudSMSService,
          useValue: new AliCloudSMSService(opts),
        },
      ],
      exports: [AliCloudSMSService],
    };
  }
}
