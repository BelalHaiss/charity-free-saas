import { Injectable } from "@nestjs/common";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import type {
  NewTransaction,
  TransactionQueryByType,
} from "@shared/types/transaction/transaction.dto";
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { endOfTheDay, startOfTheDay } from "@main/nest/shared/utils/date.util";

@Injectable()
export class TransactionService {
  constructor(private prismaService: PrismaService) {}
  create(newTransaction: NewTransaction) {
    return this.prismaService.transaction.create({ data: newTransaction });
  }

  async getExpensesName(branch_id: number) {
    const res = await this.prismaService.$queryRaw<
      { label: string }[]
    >`SELECT DISTINCT label  FROM transaction WHERE type = 'EXPENSE' AND branch_id=${branch_id}  LIMIT 100 `;
    return res.map((item) => item.label);
  }

  findByType(query: CastQueryFieldsToStrings<TransactionQueryByType>) {
    return this.prismaService.transaction.findMany({
      where: {
        type: query.type,
        created_at: {
          lte: endOfTheDay(query.date),
          gte: startOfTheDay(query.date),
        },
        branch_id: +query.branchId,
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
    return `This action removes a #${id} transaction`;
  }
}
