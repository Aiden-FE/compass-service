import {IsOptional, IsString} from "class-validator";
import {PermissionsEnum} from "@common/config";

interface AbstractResponse {
  status: ResponseCode
  message?: string
}

export interface SuccessResponse extends AbstractResponse {
  status: ResponseCode.SUCCESS
  result?: unknown
  message?: string
}

export interface ErrorResponse extends AbstractResponse {
  status: ResponseCode
  result?: unknown
  message?: string
  details?: string
}

export enum ResponseCode {
  SUCCESS = 100200, // 业务操作成功
  // 1004XX含义参考: https://www.5axxw.com/wiki/content/sydn5o
  ERROR = 100400, // 业务异常
  UNAUTHORIZED = 100401, // 未授权异常
  NOT_FOUND = 100404, // 找不到相关资源
  // 101XXX 自行定义的状态码
  ER_DUP_ENTRY = 101001, // unique重复
}

export class PaginationDto {
  @IsOptional()
  @IsString()
  pageNum?: string
  
  @IsOptional()
  @IsString()
  pageSize?: string
}

export interface SessionCompass {
  emailCaptcha: string
  smsCaptcha: string
  imageCaptcha: string
}

export interface AuthorizationOptions {
  mode: 'OR' | 'AND'
  permissions: PermissionsEnum[]
}

export interface ResponseDataOptions {
  status?: ResponseCode
  message?: string
  details?: string
  responseType?: 'json' | 'assets'
}

export class ResponseData<T = unknown> {
  private options: ResponseDataOptions
  constructor(
    private result: T,
    options?: ResponseDataOptions
  ) {
    this.options = Object.assign({
      status: ResponseCode.SUCCESS,
      message: 'Operation succeeded',
      responseType: 'json'
    }, options)
  }
  
  getResponseType () {
    return this.options.responseType
  }
  
  getStatus () {
    return this.options.status
  }
  
  getResponse () {
    return this.getResponseType() === 'json' ? {
      result: this.result,
      status: this.getStatus(),
      message: this.options.message,
      details: this.options.details,
    } : this.result
  }
}
