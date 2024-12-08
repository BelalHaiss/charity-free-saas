import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
} from "@nestjs/common";
import { DonateService } from "./donate.service";
import { CreateDonateDto } from "./dto/create-donate.dto";
import { UpdateDonateDto } from "./dto/update-donate.dto";
import type {
  CastDateFieldsToIsoDate,
  CastQueryFieldsToStrings,
} from "@shared/types/util.types";
import type {
  NewDonate,
  QueryDonateByDate,
} from "@shared/types/donates/donates.dto";
import { ZodValidationPipe } from "@main/nest/shared/pipes/zod.pipe";
import { newDonateServerSchema } from "@shared/services/schema/donate.schema";
import { Timezone } from "@main/nest/decrator/timezone.decrator";

@Controller("donate")
export class DonateController {
  constructor(private readonly donateService: DonateService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(newDonateServerSchema))
  create(@Body() newDonate: CastDateFieldsToIsoDate<NewDonate>) {
    return this.donateService.create(newDonate);
  }

  @Get()
  findByDate(
    @Query() query: CastQueryFieldsToStrings<QueryDonateByDate>,
    @Timezone() timeZone: string,
  ) {
    return this.donateService.findByDate(query, timeZone);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.donateService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDonateDto: UpdateDonateDto) {
    return this.donateService.update(+id, updateDonateDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.donateService.remove(+id);
  }
}
