import { INestApplication } from '@nestjs/common';
import { provideSwaggerPlugin } from '@shared';

export default async function providePlugins(app: INestApplication) {
  provideSwaggerPlugin(app, {
    title: 'Compass service',
    description: 'A Nestjs backend service.',
  });
}
