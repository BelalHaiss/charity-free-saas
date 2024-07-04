import { Module } from "@nestjs/common";
import { BeneficiaryService } from "./beneficiary.service";
import { BeneficiaryController } from "./beneficiary.controller";
import { BeneficiaryMapper } from "./beneficiary.mapper";

@Module({
  controllers: [BeneficiaryController],
  providers: [BeneficiaryService, BeneficiaryMapper],
})
export class BeneficiaryModule {}
