import { Module } from "@nestjs/common";
import { BenefitService } from "./benefit.service";
import { BenefitController } from "./benefit.controller";
import { ItemModule } from "../item/item.module";

@Module({
  imports: [ItemModule],
  controllers: [BenefitController],
  providers: [BenefitService],
})
export class BenefitModule {}
