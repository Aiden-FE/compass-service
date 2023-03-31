import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { EmailModule } from './email.module';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EmailModule.forRoot({
          service: 'outlook365',
          auth: {
            user: 'emailUser',
            pass: 'emailPassword',
          },
        }),
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
