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
        const data = result instanceof ResponseData
          ? result
          : new ResponseData(result)
        res.status(data.getHttpStatus())
        if (data.getResponseType() === 'json') {
          return data.getResponse()
        } else {
          return res.send(data.getResponse())
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
