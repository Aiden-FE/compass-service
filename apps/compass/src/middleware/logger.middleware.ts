import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { format } from 'date-fns';
import { APP_ENV } from '../config';

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  use(
    req: Request & { startTime: Date | string | number },
    res: any,
    next: (error?: any) => void,
  ) {
    if (APP_ENV.isProd && req.method.toLocaleUpperCase() === 'GET') {
      next();
    } else {
      req.startTime = new Date();
      const params =
        JSON.stringify(req.params) !== '{}'
          ? `\tParams: ${JSON.stringify(req.params)}`
          : '';
      const query =
        JSON.stringify(req.query) !== '{}'
          ? `\tQuery: ${JSON.stringify(req.query)}`
          : '';
      const body =
        JSON.stringify(req.body) !== '{}'
          ? `\tBody: ${JSON.stringify(req.body)}`
          : '';
      const reqTime = Date.now();
      res.once('close', () => {
        // @ts-ignore
        const time = new Date() - req.startTime;
        delete req.startTime;
        // eslint-disable-next-line no-console
        console.info(
          `[${format(
            reqTime,
            'yyyy-MM-dd HH:mm:ss',
          )}]\t${req.protocol.toLocaleUpperCase()}/${req.httpVersion}\t${
            req.method
          }\t${req.path}\tfrom\t[${
            req.header('x-forwarded-for') || req.ip || 'unknown ip'
          }]${params}${query}${body}\t处理耗时: ${time}毫秒`,
        );
      });
      next();
    }
  }
}
