import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { provideSwaggerPlugin, ResponseInterceptor } from '@shared';
import { DBService } from '@app/db';

export default async function providePlugins(app: INestApplication) {
  // 接口多版本
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  // cors 保护
  app.enableCors();
  // swagger文档支持
  provideSwaggerPlugin(app, {
    title: 'Compass service',
    description: 'A Nestjs backend service.',
  });
  app.useGlobalPipes(
    // 入参数据验证
    new ValidationPipe({
      transform: true, // 转换数据
      whitelist: true, // 剥离装饰器不验证的项目
      stopAtFirstError: true, // 遇见第一个错误时就停止验证
      // skipMissingProperties: true, // 跳过未定义或定义null的验证
      // disableErrorMessages: true, // 禁用详细错误信息
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 断开连接前需要关闭db连接
  const dbService = app.get(DBService);
  await dbService.enableShutdownHooks(app);
}
