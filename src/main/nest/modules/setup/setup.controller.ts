import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { SetupService } from './setup.service';
import { ZodValidationPipe } from '@main/nest/shared/pipes/zod.pipe';
import { initialSetupSchema } from '@shared/services/schema/setup.schema';
import { type InitialSetupToServer } from '@shared/types/setup/initial.dto';
import { initialSetupClientToServer } from './pipes/server-transform.pipe';

@Controller('setup')
export class SetupController {
  constructor(private setupService: SetupService) {}

  @Post('init')
  @UsePipes(new ZodValidationPipe(initialSetupSchema))
  async initialSetup(
    @Body(initialSetupClientToServer) bodyData: InitialSetupToServer
  ) {
    return this.setupService.initialSetup(bodyData);
  }
}
