import { Module } from "@nestjs/common";
import { SetupModule } from "./modules/setup/setup.module";
import { UserModule } from "./modules/user/user.module";
import { OrganizationModule } from "./modules/organization/organization.module";
import { PrismaModule } from "./shared/services/prisma.service";
import { BeneficiaryModule } from "./modules/beneficiary/beneficiary.module";
import { UnitModule } from "./modules/unit/unit.module";
import { TransactionModule } from "./modules/transaction/transaction.module";
import { DonateModule } from "./modules/donate/donate.module";
import { NoteModule } from "./modules/note/note.module";

@Module({
  imports: [
    PrismaModule,
    SetupModule,
    UserModule,
    OrganizationModule,
    BeneficiaryModule,
    UnitModule,
    TransactionModule,
    DonateModule,
    NoteModule,
  ],
})
export class AppModule {}
