import { Module } from "@nestjs/common";
import { DonateService } from "./donate.service";
import { DonateController } from "./donate.controller";
import { UnitModule } from "../unit/unit.module";
import { ItemModule } from "../item/item.module";

@Module({
  imports: [UnitModule, ItemModule],
  controllers: [DonateController],
  providers: [DonateService],
})
export class DonateModule {}
