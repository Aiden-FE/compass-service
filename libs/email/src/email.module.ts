import { Module } from '@nestjs/common';
import { EmailConstructor } from '@libs/email/email.dto';
import { EmailService } from './email.service';

@Module({
  exports: [EmailService],
})
export class EmailModule {
  static forRoot(opts: EmailConstructor) {
    return {
      module: EmailModule,
      providers: [
        {
          provide: EmailService,
          useValue: new EmailService(opts),
        },
      ],
      exports: [EmailService],
    };
  }
}
