import { HttpStatus } from '@nestjs/common';

export enum ResponseCode {
  SUCCESS = 100200, // 业务操作成功
  // 1004XX含义参考: https://www.5axxw.com/wiki/content/sydn5o
  ERROR = 100400, // 业务异常
  UNAUTHORIZED = 100401, // 未授权异常
  NOT_FOUND = 100404, // 找不到相关资源
  // 101XXX 自行定义的状态码
  ER_DUP_ENTRY = 101001, // unique重复
}

export interface AbstractResponse<Data = null> {
  statusCode: ResponseCode;
  data: Data | null;
  message?: string;
  details?: string;
}

export interface HttpResponseOption<Data = unknown> extends AbstractResponse<Data> {
  responseType: 'json' | 'string';
  httpStatus: HttpStatus;
}

export class HttpResponse<Data = null> {
  private readonly option: HttpResponseOption<Data>;

  constructor(data?: Data, option?: Partial<Omit<HttpResponseOption, 'data'>>) {
    this.option = {
      statusCode: ResponseCode.SUCCESS,
      httpStatus: HttpStatus.OK,
      responseType: 'json',
      message: '请求成功',
      ...option,
      data: data === undefined ? null : data,
    };
  }

  getResponseType() {
    return this.option.responseType;
  }

  getStatusCode() {
    return this.option.statusCode;
  }

  getHttpStatus() {
    return this.option.httpStatus;
  }

  getResponse() {
    switch (this.option.responseType) {
      case 'string':
        return this.option.data;
      case 'json':
      default:
        return {
          statusCode: this.option.statusCode,
          data: this.option.data,
          message: this.option.message,
          details: this.option.details,
        } as AbstractResponse;
    }
  }
}
