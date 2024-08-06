import { PartialType } from "@nestjs/mapped-types";
import { CreateMoneyUnitDto } from "./create-money_unit.dto";

export class UpdateMoneyUnitDto extends PartialType(CreateMoneyUnitDto) {}
