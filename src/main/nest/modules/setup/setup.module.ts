import { Module } from '@nestjs/common';
import { SetupService } from './setup.service';
import { SetupController } from './setup.controller';
import { OrganizationModule } from '../organization/organization.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [OrganizationModule, UserModule],
  controllers: [SetupController],
  providers: [SetupService]
})
export class SetupModule {}
