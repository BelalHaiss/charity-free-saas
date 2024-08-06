import { Module } from "@nestjs/common";
import { MoneyUnitService } from "./money_unit.service";
import { MoneyUnitController } from "./money_unit.controller";

@Module({
  controllers: [MoneyUnitController],
  providers: [MoneyUnitService],
})
export class MoneyUnitModule {}
