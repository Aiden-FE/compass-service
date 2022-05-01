import { Test, TestingModule } from '@nestjs/testing';
import { AliCloudSMSService } from './sms.service';

describe('SmsService', () => {
  let service: AliCloudSMSService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AliCloudSMSService],
    }).compile();

    service = module.get<AliCloudSMSService>(AliCloudSMSService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
