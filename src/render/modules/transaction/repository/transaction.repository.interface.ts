import { Transaction } from "@prisma/client";
import { TransactionQueryByType } from "@shared/types/transaction/transaction.dto";

export interface TransactionRepositoryI {
  findTransactionByDateAndType(
    query: TransactionQueryByType,
  ): Promise<Transaction[]>;
}
