export interface AliCloudSMSConstructor {
  accessKeyId: string;
  accessKeySecret: string;
  /** default = dysmsapi.aliyuncs.com */
  endpoint?: string;
}

export interface SendSMSParams {
  signName?: string;
  templateCode: string;
  phoneNumbers: string;
  templateParam?: Record<string, string>;
}
