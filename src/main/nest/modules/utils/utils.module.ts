import { Global, Module } from "@nestjs/common";
import { UtilsService } from "./utils.service";
import { DateService } from "./date.service";

@Global()
@Module({
  providers: [UtilsService, DateService],
  exports: [UtilsService],
})
export class UtilsModule {}
