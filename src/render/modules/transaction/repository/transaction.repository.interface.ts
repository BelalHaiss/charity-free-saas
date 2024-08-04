import { TransactionQueryByType } from "@shared/types/transaction/transaction.dto";
import { ClientTransaction } from "../types/transactions.types";

export interface TransactionRepositoryI {
  findTransactionByDateAndType(
    query: TransactionQueryByType,
  ): Promise<ClientTransaction[]>;
}
