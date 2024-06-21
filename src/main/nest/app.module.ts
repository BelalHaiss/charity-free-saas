import { Module } from '@nestjs/common';
import { SetupModule } from './modules/setup/setup.module';
import { UserModule } from './modules/user/user.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { PrismaModule } from './shared/services/prisma.service';
import { BeneficiaryModule } from './modules/beneficiary/beneficiary.module';

@Module({
  imports: [PrismaModule, SetupModule, UserModule, OrganizationModule, BeneficiaryModule]
})
export class AppModule {}
