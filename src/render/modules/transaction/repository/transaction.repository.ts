import { Transaction } from "@prisma/client";
import { TransactionQueryByType } from "@shared/types/transaction/transaction.dto";
import { TransactionRepositoryI } from "./transaction.repository.interface";
import { fetcher } from "@render/utils/api.util";
import { Ref } from "vue";
import qs from "qs";

class TransactionRepository implements TransactionRepositoryI {
  async findTransactionByDateAndType(
    query: Ref<TransactionQueryByType>,
  ): Promise<Transaction[]> {
    const queryString = qs.stringify(query.value);

    const res = await fetcher<Transaction[]>({
      url: `transaction/?${queryString}`,
    });
    return res ?? [];
  }
}

export const transactionRepository = new TransactionRepository();
