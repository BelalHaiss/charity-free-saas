import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MoneyUnitService } from "./money_unit.service";
import { CreateMoneyUnitDto } from "./dto/create-money_unit.dto";
import { UpdateMoneyUnitDto } from "./dto/update-money_unit.dto";

@Controller("money-unit")
export class MoneyUnitController {
  constructor(private readonly moneyUnitService: MoneyUnitService) {}

  @Post()
  create(@Body() createMoneyUnitDto: CreateMoneyUnitDto) {
    return this.moneyUnitService.create(createMoneyUnitDto);
  }

  @Get()
  findAll() {
    return this.moneyUnitService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.moneyUnitService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMoneyUnitDto: UpdateMoneyUnitDto,
  ) {
    return this.moneyUnitService.update(+id, updateMoneyUnitDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.moneyUnitService.remove(+id);
  }
}
