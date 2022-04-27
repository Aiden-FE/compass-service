import { Injectable } from '@nestjs/common';
import { readFileSync } from "fs";
import * as Joi from 'joi';
import { ResponseException } from "@common";

export interface EnvironmentDataType {
  ENV: string,
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
  get<T extends keyof EnvironmentDataType>(key?: T): EnvironmentDataType[T] {
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
