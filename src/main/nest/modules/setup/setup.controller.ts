import { Body, Controller, Get, Post } from "@nestjs/common";
import { SetupService } from "./setup.service";
import { initialSetupSchema } from "@shared/services/schema/setup.schema";
import { InitialSetupToServer } from "@shared/types/setup/initial.dto";
import { ZodValidationService } from "../utils/zod-validation.service";

@Controller("setup")
export class SetupController {
  constructor(
    private setupService: SetupService,
    private readonly zodValidationService: ZodValidationService,
  ) {}

  @Get("status")
  isSetupDone() {
    return this.setupService.isAppAlreadySetup();
  }
}
