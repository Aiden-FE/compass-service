import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
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
    );
  }
}
