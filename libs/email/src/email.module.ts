import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailConstructor } from '@libs/email/email.dto';

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
