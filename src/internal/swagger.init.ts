import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { coreConfig } from 'config/core';
import { swaggerConfig } from 'config/swagger';
// import * as fs from 'fs';

type SecuritySchemeType = 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';

export const SwaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addBearerAuth({
      type: swaggerConfig.auth.type as SecuritySchemeType,
      description: swaggerConfig.auth.description,
      scheme: swaggerConfig.auth.schema,
      name: swaggerConfig.auth.name,
      bearerFormat: swaggerConfig.auth.bearer_format,
    })
    .addServer(coreConfig.baseUrl)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // fs.writeFileSync('./swagger.json', JSON.stringify(document));
  return SwaggerModule.setup(swaggerConfig.apiPrefix, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
    },
  });
};
