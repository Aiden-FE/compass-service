import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {
  // https://nodemailer.com/usage/ 详见
  static forRoot(option: any, defaultOption?: any) {
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
