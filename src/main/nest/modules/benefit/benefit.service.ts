import { Injectable } from "@nestjs/common";
import {
  CreateNewItem,
  deleteBenefitItems,
  EditFinancialBenefitPayload,
  EditItemPayload,
} from "@shared/types/benefit/benefit.dto";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { CreateFinancialBenefitPayload } from "@shared/types/benefit/benefit.dto";

@Injectable()
export class BenefitService {
  constructor(private prismaService: PrismaService) {}
  create(newItem: CreateNewItem) {
    return this.prismaService.benefit.create({
      data: {
        type: "ITEM",
        Item: {
          create: newItem,
        },
      },
    });
  }
  createItems(newItems: CreateNewItem[]) {
    return this.prismaService.$transaction(async (tx) => {
      const bulkCreate = newItems.map((item) =>
        tx.benefit.create({
          data: {
            type: "ITEM",
            Item: {
              create: item,
            },
          },
        }),
      );
      await Promise.all(bulkCreate);
    });
  }

  editItems(editedItems: EditItemPayload[]) {
    return this.prismaService.$transaction(async (tx) => {
      const bulkEdit = editedItems.map((item) =>
        tx.item.update({
          where: {
            id: item.id,
          },
          data: item,
        }),
      );
      await Promise.all(bulkEdit);
    });
  }

  // financial items  services methods
  createFinancialItems(financialItems: CreateFinancialBenefitPayload[]) {
    this.prismaService.$transaction(async (tx) => {
      const bulkCreate = financialItems.map((financialItem) =>
        tx.benefit.create({
          data: {
            type: "FINANCIAL",
            FinancialBenefit: {
              create: financialItem,
            },
          },
        }),
      );
      await Promise.all(bulkCreate);
    });
  }

  editFinancialItems(editedItems: EditFinancialBenefitPayload[]) {
    return this.prismaService.$transaction(async (tx) => {
      const bulkEdit = editedItems.map((item) =>
        tx.financialBenefit.update({
          where: {
            id: item.id,
          },
          data: item,
        }),
      );
      await Promise.all(bulkEdit);
    });
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
