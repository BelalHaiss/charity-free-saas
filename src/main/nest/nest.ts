import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  GlobalExceptionFilter,
  CustomHttpExceptionFilter,
  PrismaExceptionFilter,
  CustomExceptionFilter
} from './shared/exception/http-exception.filter';

export const bootstrapNest = async () => {
  const nestApp = await NestFactory.create(AppModule);
  nestApp.enableCors({});
  nestApp.useGlobalFilters(
    new GlobalExceptionFilter(),
    new CustomHttpExceptionFilter(),
    new PrismaExceptionFilter(),
    new CustomExceptionFilter()
  );
  nestApp.setGlobalPrefix('/v1/api');

  await nestApp.listen(4000);
};
