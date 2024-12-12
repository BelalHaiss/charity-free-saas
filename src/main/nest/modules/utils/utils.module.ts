import { Global, Module } from "@nestjs/common";
import { UtilsService } from "./utils.service";
import { DateService } from "./date.service";
import { ZodValidationService } from "./zod-validation.service";

@Global()
@Module({
  providers: [UtilsService, DateService, ZodValidationService],
  exports: [UtilsService, ZodValidationService],
})
export class UtilsModule {}
