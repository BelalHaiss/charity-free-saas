import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Get,
  Query,
} from "@nestjs/common";
import { BenefitService } from "./benefit.service";
import type {
  CreateNewItem,
  EditItemPayload,
  CreateFinancialBenefitPayload,
  EditFinancialBenefitPayload,
  deleteBenefitItems,
  ItemBenefitsTableQuery,
  FinancialBenefitsTableQuery,
} from "@shared/types/benefit/benefit.dto";
import { ZodValidationService } from "../utils/zod-validation.service";
import {
  createBenefitItemPayloadSchema,
  createFinancialItemsPayloadSchema,
  editBenefitItemPayloadSchema,
  editFinancialItemsPayloadSchema,
} from "@shared/services/schema/benefit.schema";
import { Language } from "@main/nest/decorator/headers.decorator";
import type {
  CastQueryFieldsToStrings,
  Locale,
} from "@shared/types/util.types";

@Controller("benefit")
export class BenefitController {
  constructor(
    private readonly benefitService: BenefitService,
    private readonly zodValidationService: ZodValidationService,
  ) {}

  // Create multiple Items
  @Post("items")
  createItems(@Body() newItems: CreateNewItem[], @Language() locale: Locale) {
    const parsedItems = this.zodValidationService.validate(
      newItems,
      createBenefitItemPayloadSchema,
      locale,
    );
    return this.benefitService.createItems(parsedItems);
  }

  // Edit multiple Items
  @Patch("items")
  editItems(
    @Body() editedItems: EditItemPayload[],
    @Language() locale: Locale,
  ) {
    const parsedItems = this.zodValidationService.validate(
      editedItems,
      editBenefitItemPayloadSchema,
      locale,
    );
    return this.benefitService.editItems(parsedItems);
  }

  @Get("items")
  findItems(@Query() query: CastQueryFieldsToStrings<ItemBenefitsTableQuery>) {
    return this.benefitService.findAllItems(query);
  }

  // Create multiple Financial Benefits
  @Post("financial")
  createFinancialItems(
    @Body() financialItems: CreateFinancialBenefitPayload[],
    @Language() locale: Locale,
  ) {
    const parsedItems = this.zodValidationService.validate(
      financialItems,
      createFinancialItemsPayloadSchema,
      locale,
    );

    return this.benefitService.createFinancialItems(parsedItems);
  }

  // Edit multiple Financial Benefits
  @Patch("financial")
  editFinancialItems(
    @Body() editedItems: EditFinancialBenefitPayload[],
    @Language() locale: Locale,
  ) {
    const parsedItems = this.zodValidationService.validate(
      editedItems,
      editFinancialItemsPayloadSchema,
      locale,
    );

    return this.benefitService.editFinancialItems(parsedItems);
  }

  @Get("financial")
  findFinanceBenefits(
    @Query() query: CastQueryFieldsToStrings<FinancialBenefitsTableQuery>,
  ) {
    return this.benefitService.findAllFinancialBenefits(query);
  }

  // Delete multiple Benefit items
  @Delete()
  deleteBenefitItems(@Body() itemsIds: deleteBenefitItems) {
    return this.benefitService.deleteBenefitItems(itemsIds);
  }
}
