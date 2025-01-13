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
import { CategoryModule } from "./modules/category/category.module";
import { BenefitModule } from "./modules/benefit/benefit.module";
import { ItemModule } from "./modules/item/item.module";
import { UtilsModule } from "./modules/utils/utils.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { FinancialBenefitModule } from "./modules/financial-benefit/financial-benefit.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    PrismaModule,
    SetupModule,
    UserModule,
    OrganizationModule,
    BeneficiaryModule,
    UnitModule,
    TransactionModule,
    DonateModule,
    NoteModule,
    CategoryModule,
    BenefitModule,
    ItemModule,
    UtilsModule,
    AuthModule,
    FinancialBenefitModule,
  ],
})
export class AppModule {}
