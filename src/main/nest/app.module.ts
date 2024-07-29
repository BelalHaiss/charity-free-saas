import { Module } from "@nestjs/common";
import { SetupModule } from "./modules/setup/setup.module";
import { UserModule } from "./modules/user/user.module";
import { OrganizationModule } from "./modules/organization/organization.module";
import { PrismaModule } from "./shared/services/prisma.service";
import { BeneficiaryModule } from "./modules/beneficiary/beneficiary.module";
import { UnitModule } from "./modules/unit/unit.module";
import { TransactionModule } from "./modules/transaction/transaction.module";

@Module({
  imports: [
    PrismaModule,
    SetupModule,
    UserModule,
    OrganizationModule,
    BeneficiaryModule,
    UnitModule,
    TransactionModule,
  ],
})
export class AppModule {}
