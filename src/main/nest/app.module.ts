import { Module } from '@nestjs/common';
import { SetupModule } from './modules/setup/setup.module';
import { UserModule } from './modules/user/user.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { PrismaModule } from './shared/services/prisma.service';

@Module({
  imports: [PrismaModule, SetupModule, UserModule, OrganizationModule]
})
export class AppModule {}
