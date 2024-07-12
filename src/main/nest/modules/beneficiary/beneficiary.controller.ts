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
import { BeneficiaryService } from "./beneficiary.service";
import type { BeneficiaryTableQuery } from "@shared/types/beneficiaries/beneficiaries.dto";
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";

@Controller("beneficiary")
export class BeneficiaryController {
  constructor(private readonly beneficiaryService: BeneficiaryService) {}

  @Post()
  create(@Body() createBeneficiaryDto: object) {
    return this.beneficiaryService.create(createBeneficiaryDto);
  }

  @Get()
  findAll(@Query() query: CastQueryFieldsToStrings<BeneficiaryTableQuery>) {
    return this.beneficiaryService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.beneficiaryService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBeneficiaryDto: object) {
    return this.beneficiaryService.update(+id, updateBeneficiaryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.beneficiaryService.remove(+id);
  }
}
