import { HttpStatus } from '@nestjs/common';

export enum ResponseCode {
  CONTINUE = 100100,
  SWITCHING_PROTOCOLS = 100101,
  PROCESSING = 100102,
  EARLYHINTS = 100103,
  OK = 100200, // 业务操作成功
  CREATED = 100201,
  ACCEPTED = 100202,
  NON_AUTHORITATIVE_INFORMATION = 100203,
  NO_CONTENT = 100204,
  RESET_CONTENT = 100205,
  PARTIAL_CONTENT = 100206,
  AMBIGUOUS = 100300,
  MOVED_PERMANENTLY = 100301,
  FOUND = 100302,
  SEE_OTHER = 100303,
  NOT_MODIFIED = 100304,
  TEMPORARY_REDIRECT = 100307,
  PERMANENT_REDIRECT = 100308,
  // 1004XX含义参考: https://www.5axxw.com/wiki/content/sydn5o
  BAD_REQUEST = 100400, // 业务异常
  UNAUTHORIZED = 100401, // 未授权异常
  PAYMENT_REQUIRED = 100402,
  FORBIDDEN = 100403, // 禁止访问,验证不通过
  NOT_FOUND = 100404, // 找不到相关资源
  METHOD_NOT_ALLOWED = 100405,
  NOT_ACCEPTABLE = 100406,
  PROXY_AUTHENTICATION_REQUIRED = 100407,
  REQUEST_TIMEOUT = 100408,
  CONFLICT = 100409,
  GONE = 100410,
  LENGTH_REQUIRED = 100411,
  PRECONDITION_FAILED = 100412,
  PAYLOAD_TOO_LARGE = 100413,
  URI_TOO_LONG = 100414,
  UNSUPPORTED_MEDIA_TYPE = 100415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 100416,
  EXPECTATION_FAILED = 100417,
  I_AM_A_TEAPOT = 100418,
  MISDIRECTED = 100421,
  UNPROCESSABLE_ENTITY = 100422,
  FAILED_DEPENDENCY = 100424,
  PRECONDITION_REQUIRED = 100428,
  TOO_MANY_REQUESTS = 100429,
  INTERNAL_SERVER_ERROR = 100500, // 服务器内部错误
  NOT_IMPLEMENTED = 100501,
  BAD_GATEWAY = 100502,
  SERVICE_UNAVAILABLE = 100503,
  GATEWAY_TIMEOUT = 100504,
  HTTP_VERSION_NOT_SUPPORTED = 100505,
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
  responseType: 'json' | 'text';
  httpStatus: HttpStatus;
}

export class HttpResponse<Data = null> {
  private readonly option: HttpResponseOption<Data>;

  constructor(data?: Data, option?: Partial<Omit<HttpResponseOption, 'data'>>) {
    this.option = {
      statusCode: ResponseCode.OK,
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
      case 'text':
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
