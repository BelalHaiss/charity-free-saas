import { Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import type { TransactionQueryByType } from "@shared/types/transaction/transaction.dto";
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { endOfTheDay, startOfTheDay } from "@main/nest/shared/utils/date.util";

@Injectable()
export class TransactionService {
  constructor(private prismaService: PrismaService) {}
  create(createTransactionDto: CreateTransactionDto) {
    return "This action adds a new transaction";
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
