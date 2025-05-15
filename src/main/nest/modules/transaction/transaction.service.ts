import { Injectable } from "@nestjs/common";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import type {
  NewTransaction,
  TransactionQueryByType,
} from "@shared/types/transaction/transaction.dto";
import type {
  CastDateFieldsToIsoDate,
  CastQueryFieldsToStrings,
} from "@shared/types/util.types";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { UtilsService } from "../utils/utils.service";
import { removeFields } from "@shared/services/object.util";

@Injectable()
export class TransactionService {
  constructor(
    private prismaService: PrismaService,
    private utilService: UtilsService,
  ) {}
  create(newTransaction: CastDateFieldsToIsoDate<NewTransaction>) {
    return this.prismaService.transaction.create({
      data: {
        ...removeFields(newTransaction, ["date"]),
        created_at: newTransaction.date,
      },
    });
  }

  async getExpensesName(branch_id: number) {
    const res = await this.prismaService.$queryRaw<
      { label: string }[]
    >`SELECT DISTINCT label  FROM transaction WHERE type = 'EXPENSE' AND branch_id=${branch_id}  LIMIT 100 `;
    return res.map((item) => item.label);
  }

  findByType(
    query: CastQueryFieldsToStrings<TransactionQueryByType>,
    timeZone: string,
  ) {
    return this.prismaService.transaction.findMany({
      where: {
        type: query.type,
        created_at: this.utilService.getFullDayDateFilter(query.date, timeZone),
        branch_id: +query.branchId,
      },
      include: {
        Unit: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return this.prismaService.transaction.delete({ where: { id } });
  }
}
