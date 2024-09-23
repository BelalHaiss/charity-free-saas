import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { BenefitService } from "./benefit.service";
import { UpdateBenefitDto } from "./dto/update-benefit.dto";
import type { CreateNewItem } from "@shared/types/item/item.dto";

@Controller("benefit")
export class BenefitController {
  constructor(private readonly benefitService: BenefitService) {}

  @Post("item")
  createItem(@Body() newItem: CreateNewItem) {
    return this.benefitService.create(newItem);
  }

  @Get()
  findAll() {
    return this.benefitService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.benefitService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBenefitDto: UpdateBenefitDto) {
    return this.benefitService.update(+id, updateBenefitDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.benefitService.remove(+id);
  }
}
