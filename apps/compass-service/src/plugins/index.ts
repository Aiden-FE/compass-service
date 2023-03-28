import { INestApplication, VersioningType } from '@nestjs/common';
import { provideSwaggerPlugin } from '@shared';

export default async function providePlugins(app: INestApplication) {
  // 接口多版本
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // swagger文档支持
  provideSwaggerPlugin(app, {
    title: 'Compass service',
    description: 'A Nestjs backend service.',
  });
}
