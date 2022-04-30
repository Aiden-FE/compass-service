import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {catchError, Observable, throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import {ErrorResponse, ResponseCode, ResponseException, SuccessResponse} from "@common";

const DEFAULT_MESSAGE = 'operation succeeded';

/**
 * @description 响应拦截器
 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(resp => {
        let responseData: SuccessResponse | ErrorResponse;
        if (Array.isArray(resp)) {
          const [result, status, message, details] = resp;
          responseData = {
            result,
            message: message || DEFAULT_MESSAGE,
            status: status || ResponseCode.SUCCESS,
            details
          };
        } else {
          responseData = {
            result: resp,
            status: ResponseCode.SUCCESS,
            message: DEFAULT_MESSAGE,
          };
        }
        return responseData;
      }),
      catchError((err) => {
        console.log('catch error: ', err)
        return throwError(() => new ResponseException({
          details: err.response?.message.join(';\n'),
          message: err.response?.message.join(';\n')
            || err.meta?.cause
            || err.message,
        }))
      }),
    );
  }
}
