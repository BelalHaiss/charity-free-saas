import { Module } from "@nestjs/common";
import { BenefitService } from "./benefit.service";
import { BenefitController } from "./benefit.controller";
import { ItemModule } from "../item/item.module";
import { FinancialBenefitModule } from "../financial-benefit/financial-benefit.module";

@Module({
  imports: [ItemModule, FinancialBenefitModule],
  controllers: [BenefitController],
  providers: [BenefitService],
})
export class BenefitModule {}
