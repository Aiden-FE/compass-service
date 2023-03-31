import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { provideSwaggerPlugin, ResponseInterceptor, validationOption } from '@shared';
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
    new ValidationPipe(validationOption),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 断开连接前需要关闭db连接
  const dbService = app.get(DBService);
  await dbService.enableShutdownHooks(app);
}
