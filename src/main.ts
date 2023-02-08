import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { SwaggerConfig } from './internal/swagger.init';
import { AppModule } from './app.module';
import { ValidationPipe } from './decorators/service.validator';
import { connectToDatabase } from './internal/database.init';
import { coreConfig } from 'config/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './internal/exception/all-exception-filter';

async function bootstrap() {
  await connectToDatabase();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(coreConfig.restApiPrefix);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(cookieParser());
  SwaggerConfig(app);
  await app.listen(coreConfig.port);
  console.log(`http://${coreConfig.host}:${coreConfig.port}`);
}

bootstrap();
