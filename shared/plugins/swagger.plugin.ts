import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../../package.json';

export default function provideSwaggerPlugin(
  app: INestApplication,
  option: {
    title: string;
    version?: string;
    description?: string;
    path?: string;
  },
) {
  const docsPath = option.path || '/api/docs';
  const apiDocOptions = new DocumentBuilder()
    .setTitle(option.title)
    .setDescription(option.description)
    .setVersion(option.version || version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, apiDocOptions);
  SwaggerModule.setup(docsPath, app, document);
  Logger.log(`The access path for the swagger document is "${docsPath}"`, 'SwaggerDocument');
}
