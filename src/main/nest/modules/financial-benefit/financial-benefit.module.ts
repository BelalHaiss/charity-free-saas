import { Module } from "@nestjs/common";
import { FinancialBenefitService } from "./financial-benefit.service";

@Module({
  providers: [FinancialBenefitService],
  exports: [FinancialBenefitService],
})
export class FinancialBenefitModule {}
