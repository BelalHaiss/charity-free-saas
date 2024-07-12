import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  GlobalExceptionFilter,
  CustomHttpExceptionFilter,
  PrismaExceptionFilter,
  CustomExceptionFilter,
} from "./shared/exception/http-exception.filter";

export const bootstrapNest = async () => {
  const nestApp = await NestFactory.create(AppModule);
  nestApp.enableCors({});
  nestApp.useGlobalFilters(
    new GlobalExceptionFilter(),
    new CustomHttpExceptionFilter(),
    new PrismaExceptionFilter(),
    new CustomExceptionFilter(),
  );
  nestApp.setGlobalPrefix("/api/v1");

  await nestApp.listen(4000);
};
