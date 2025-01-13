import { Injectable } from "@nestjs/common";
import {
  CreateNewItem,
  deleteBenefitItems,
  EditFinancialBenefitPayload,
  EditItemPayload,
  FinancialBenefitsTableQuery,
  ItemBenefitsTableQuery,
} from "@shared/types/benefit/benefit.dto";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { CreateFinancialBenefitPayload } from "@shared/types/benefit/benefit.dto";
import { ItemService } from "../item/item.service";
import { FinancialBenefitService } from "../financial-benefit/financial-benefit.service";
import { CastQueryFieldsToStrings } from "@shared/types/util.types";

@Injectable()
export class BenefitService {
  constructor(
    private prismaService: PrismaService,
    private readonly itemService: ItemService,
    private readonly financialBenefitService: FinancialBenefitService,
  ) {}
  createItems(newItems: CreateNewItem[]) {
    return this.itemService.createItems(newItems);
  }

  editItems(editedItems: EditItemPayload[]) {
    return this.itemService.editItems(editedItems);
  }

  findAllItems(query: CastQueryFieldsToStrings<ItemBenefitsTableQuery>) {
    return this.itemService.findAll(query);
  }

  // financial items  services methods
  createFinancialItems(financialItems: CreateFinancialBenefitPayload[]) {
    return this.financialBenefitService.createFinancialItems(financialItems);
  }

  editFinancialItems(editedItems: EditFinancialBenefitPayload[]) {
    return this.financialBenefitService.editFinancialItems(editedItems);
  }

  findAllFinancialBenefits(
    query: CastQueryFieldsToStrings<FinancialBenefitsTableQuery>,
  ) {
    return this.financialBenefitService.findAll(query);
  }

  // delete any benefit item
  deleteBenefitItems(itemsIds: deleteBenefitItems) {
    return this.prismaService.benefit.deleteMany({
      where: {
        id: {
          in: itemsIds,
        },
      },
    });
  }
}
