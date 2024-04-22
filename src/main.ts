import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Global, ValidationPipe } from '@nestjs/common';
import { GlobalTypeOrmExceptionHandler } from './exceptions/global.exception.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalTypeOrmExceptionHandler())
  await app.listen(3000);
}
bootstrap();
