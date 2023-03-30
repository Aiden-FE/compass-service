import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailTransportParams } from './email.dto';

@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {
  static forRoot(option: EmailTransportParams[0], defaultOption?: EmailTransportParams[1]) {
    return {
      module: EmailModule,
      providers: [
        {
          provide: EmailService,
          useValue: new EmailService(option, defaultOption),
        },
      ],
      exports: [EmailService],
    };
  }
}
