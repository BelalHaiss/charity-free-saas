import { Injectable, BadRequestException, HttpStatus } from "@nestjs/common";
import { ZodType, ZodError } from "zod";
import type { Request } from "express";
import { Locale } from "@shared/types/util.types";
import { CustomException } from "@main/nest/shared/exception/CustomException";

@Injectable()
export class ZodValidationService {
  validate<T>(
    value: unknown,
    schemaFactory: (locale: Locale) => ZodType<T>,
    locale: Locale,
  ): T {
    console.log({ locale });
    const schema = schemaFactory(locale); // Generate schema dynamically
    try {
      console.log({ value });
      return schema.parse(value); // Validate and transform the input
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(
          "zod validation error ",
          error.errors.map((err) => ({
            message: err.message,
            path: err.path,
          })),
        );
        throw new CustomException({
          message: `${error.errors[0].path}: ${error.errors[0].message}`,
          status: HttpStatus.BAD_REQUEST,
        });
      }
      throw error;
    }
  }
}
