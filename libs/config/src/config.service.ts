import { Injectable } from '@nestjs/common';
import { readFileSync } from "fs";
import * as Joi from 'joi';
import { ResponseException } from "@common";

export interface EnvironmentDataType {
  ENV: string,
  DATABASE_TYPE: string,
  DATABASE_HOST: string,
  DATABASE_PORT: number,
  DATABASE_NAME: string,
  DATABASE_USER: string,
  DATABASE_PASSWORD: string,
}

@Injectable()
export class ConfigService {
  private environmentData: EnvironmentDataType
  
  constructor() {
    this.environmentData = this.validateEnv(this.getEnvironmentData())
  }
  /**
   * @description 获取指定key的config值
   *
   * @param {string} key 键名
   * @memberof ConfigService
   */
  get<T extends string>(key?: T): T extends keyof EnvironmentDataType
    ? EnvironmentDataType[T]
    : EnvironmentDataType
  {
    if (!key || !Object.keys(this.environmentData).includes(key)) {
      // @ts-ignore
      return this.environmentData
    }
    // @ts-ignore
    return this.environmentData[key]
  }

  private getEnvironmentData () {
    try {
      const url = `${process.cwd()}/${
        process.env.NODE_ENV || 'development'
      }.variables.json`;
      const json = readFileSync(url, 'utf-8');
      return JSON.parse(json);
    } catch (e) {
      return {}
    }
  }
  
  private validateEnv(envConfig: Partial<EnvironmentDataType>): EnvironmentDataType {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      ENV: Joi.string().valid('dev', 'prod').default('dev'),
      DATABASE_TYPE: Joi.string().valid('mysql').default('mysql'),
      DATABASE_HOST: Joi.string().default('localhost'),
      DATABASE_PORT: Joi.number().default(3306),
      DATABASE_NAME: Joi.string().default('middle_platform'),
      DATABASE_USER: Joi.string().default('root'),
      DATABASE_PASSWORD: Joi.string().default('123456'),
    });
    
    const { error, value: validateEnvConfig } =
      envVarsSchema.validate(envConfig);
    
    if (error) {
      throw new ResponseException({
        message: `Config validation error: ${error.message || error}`
      });
    }
    return validateEnvConfig;
  }
}
