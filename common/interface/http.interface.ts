import {IsNumber} from "class-validator";
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
  @IsNumber()
  pageNum?: number
  @IsNumber()
  pageSize?: number
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
