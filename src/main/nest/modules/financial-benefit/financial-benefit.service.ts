import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { Injectable } from "@nestjs/common";
import {
  CreateFinancialBenefitPayload,
  EditFinancialBenefitPayload,
  FinancialBenefitsQueryResponse,
  FinancialBenefitsTableQuery,
} from "@shared/types/benefit/benefit.dto";
import { CastQueryFieldsToStrings } from "@shared/types/util.types";

@Injectable()
export class FinancialBenefitService {
  constructor(private prismaService: PrismaService) {}
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

  async findAll(
    query: CastQueryFieldsToStrings<FinancialBenefitsTableQuery>,
  ): Promise<FinancialBenefitsQueryResponse> {
    const [data, totalRecords] = await this.prismaService.$transaction([
      this.prismaService.financialBenefit.findMany({
        ...this.prismaService.handlePagination(query.pagination),
        orderBy: this.prismaService.handleSorting(query.sort),
      }),
      this.prismaService.financialBenefit.count(),
    ]);

    return { data, totalRecords };
  }
}
