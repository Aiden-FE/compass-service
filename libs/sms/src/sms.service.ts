import { Injectable } from '@nestjs/common';
import * as $OpenApi from '@alicloud/openapi-client';
import Dysmsapi20170525, { SendSmsRequest } from '@alicloud/dysmsapi20170525';
import { AliCloudSMSConstructor, SendSMSParams } from '@libs/sms/sms.interface';

@Injectable()
export class AliCloudSMSService {
  private client: any;
  private DEFAULT_SIGN_NAME = 'Compass';
  constructor(opts: AliCloudSMSConstructor) {
    this.client = this.createClient(opts);
  }

  /**
   * @description 发送短信
   * @param params
   */
  sendSMS(params: SendSMSParams) {
    const sendSmsRequest = new SendSmsRequest({
      signName: params.signName || this.DEFAULT_SIGN_NAME,
      templateCode: params.templateCode,
      phoneNumbers: params.phoneNumbers,
      templateParam:
        params.templateParam && JSON.stringify(params.templateParam),
    });
    return this.client
      .sendSms(sendSmsRequest)
      .then((result) => {
        if (result.body?.code !== 'OK') {
          throw new Error(result.body?.message || '短信发送失败');
        }
        return true;
      })
      .catch((error) => {
        throw new Error(error?.message || '短信发送异常');
      });
  }

  private createClient(opts: AliCloudSMSConstructor) {
    const config = new $OpenApi.Config({
      accessKeyId: opts.accessKeyId,
      accessKeySecret: opts.accessKeySecret,
    });
    config.endpoint = opts.endpoint || 'dysmsapi.aliyuncs.com';
    return new Dysmsapi20170525(config);
  }
}
