import { json, urlencoded } from 'express';
import { INestApplication } from '@nestjs/common';

export default async function provideExpressMiddleware(app: INestApplication) {
  app.use(json());
  app.use(urlencoded({ extended: true }));
}
