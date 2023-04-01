import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map, catchError, throwError, EMPTY } from 'rxjs';
import { HttpResponse } from '@shared';
import { Response } from 'express';

export default class ResponseInterceptor implements NestInterceptor {
  // eslint-disable-next-line class-methods-use-this
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result) => {
        if (context.getType() !== 'http') return result;
        const httpRespCtx = context.switchToHttp().getResponse<Response>();
        let resp: HttpResponse;
        if (result instanceof HttpResponse) {
          resp = result;
        } else {
          resp = new HttpResponse(result);
        }
        httpRespCtx.status(resp.getHttpStatus());
        return resp.getResponse();
      }),
      catchError((err) => {
        // 通过 throw new HttpResponse 抛出的异常以 HttpResponse 配置为准
        if (err instanceof HttpResponse) {
          const httpRespCtx = context.switchToHttp().getResponse<Response>();
          httpRespCtx.status(err.getHttpStatus());
          httpRespCtx.send(err.getResponse());
          return EMPTY;
        }
        // 将validate异常的数据消息组合成message
        if (err?.response?.message && Array.isArray(err.response.message)) {
          // eslint-disable-next-line no-param-reassign
          err.response.message = err.response.message.join(';');
        }
        return throwError(() => err);
      }),
    );
  }
}
