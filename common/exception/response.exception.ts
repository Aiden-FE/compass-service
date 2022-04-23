import {HttpException, HttpStatus} from "@nestjs/common";
import {ErrorResponse, ResponseCode} from "@common/interface";

/**
 * @name 业务异常响应
 */
export class ResponseException extends HttpException {
  /**
   * @param errorMsg 异常消息
   * @param errorStatus 业务异常状态码
   * @param respStatus 请求异常状态码 业务异常默认请求状态200
   */
  constructor(errorOption: Partial<ErrorResponse>, httpStatus: HttpStatus = HttpStatus.OK) {
    super(
      Object.assign({
        status: ResponseCode.ERROR,
        message: 'Unknown error'
      }, {
        status: errorOption.status,
        result: errorOption.result,
        message: errorOption.message,
        details: errorOption.details
      }),
      httpStatus,
    );
  }
}
