import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { DonateService } from "./donate.service";
import { UpdateDonateDto } from "./dto/update-donate.dto";
import type {
  CastDateFieldsToIsoDate,
  CastQueryFieldsToStrings,
  Locale,
} from "@shared/types/util.types";
import type {
  NewDonate,
  QueryDonateByDate,
} from "@shared/types/donates/donates.dto";
import { newDonateSchema } from "@shared/services/schema/donate.schema";
import { Language, Timezone } from "@main/nest/decorator/headers.decorator";
import { ZodValidationService } from "../utils/zod-validation.service";
@Controller("donate")
export class DonateController {
  constructor(
    private readonly donateService: DonateService,
    private readonly zodValidationService: ZodValidationService,
  ) {}

  @Post()
  create(
    @Body() newDonate: CastDateFieldsToIsoDate<NewDonate>,
    @Language() locale: Locale,
  ) {
    const parsedBody = this.zodValidationService.validate(
      newDonate,
      newDonateSchema,
      locale,
    );
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
