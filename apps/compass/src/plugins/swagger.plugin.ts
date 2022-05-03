import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function injectSwaggerPlugin(app: INestApplication) {
  const apiDocOptions = new DocumentBuilder()
    .setTitle('Compass service')
    .setDescription('Aiden compass service document')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, apiDocOptions);
  SwaggerModule.setup('docs/v1', app, document);
}
