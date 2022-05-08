import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {catchError, Observable, throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import {ResponseData, ResponseException} from "@common";
import {Response} from "express";

/**
 * @description 响应拦截器
 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(result => {
        const res = context.switchToHttp().getResponse<Response>()
        if (result instanceof ResponseException) {
          res.status(result.getStatus())
          return result.getResponse()
        }
        if (result instanceof ResponseData) {
          return result.getResponse()
        }
        const respData = new ResponseData(result)
        if (respData.isJSON()) {
          return new ResponseData(result).getResponse()
        } else {
          res.send(respData.getResponse())
        }
      }),
      catchError((err) => {
        console.warn('catch error: ', err)
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
