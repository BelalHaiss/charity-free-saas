import { Module } from "@nestjs/common";
import { DonateService } from "./donate.service";
import { DonateController } from "./donate.controller";
import { UnitModule } from "../unit/unit.module";

@Module({
  imports: [UnitModule],
  controllers: [DonateController],
  providers: [DonateService],
})
export class DonateModule {}
