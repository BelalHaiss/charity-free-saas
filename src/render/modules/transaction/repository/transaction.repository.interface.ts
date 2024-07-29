import { Transaction } from "@prisma/client";
import { TransactionQueryByType } from "@shared/types/transaction/transaction.dto";
import { Ref } from "vue";

export interface TransactionRepositoryI {
  findTransactionByDateAndType(
    query: Ref<TransactionQueryByType>,
  ): Promise<Transaction[]>;
}
