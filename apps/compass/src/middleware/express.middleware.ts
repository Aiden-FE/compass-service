import {json, urlencoded} from "express";
import {INestApplication} from "@nestjs/common";

export default function injectExpressMiddleware (app: INestApplication) {
  app.use(json());
  app.use(urlencoded({ extended: true }));
}
