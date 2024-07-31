import { Transaction } from "@prisma/client";
import { TransactionQueryByType } from "@shared/types/transaction/transaction.dto";
import { TransactionRepositoryI } from "./transaction.repository.interface";
import { fetcher } from "@render/utils/api.util";
import qs from "qs";

class TransactionRepository implements TransactionRepositoryI {
  findTransactionByDateAndType(
    query: TransactionQueryByType,
  ): Promise<Transaction[]> {
    const queryString = qs.stringify(query);

    return fetcher<Transaction[]>({
      url: `transaction/?${queryString}`,
    });
  }
}

export const transactionRepository = new TransactionRepository();
