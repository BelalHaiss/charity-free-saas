import { TransactionQueryByType } from "@shared/types/transaction/transaction.dto";
import { TransactionRepositoryI } from "./transaction.repository.interface";
import { fetcher } from "@render/utils/api.util";
import qs from "qs";
import { ClientTransaction } from "../types/transactions.types";

class TransactionRepository implements TransactionRepositoryI {
  findTransactionByDateAndType(
    query: TransactionQueryByType,
  ): Promise<ClientTransaction[]> {
    const queryString = qs.stringify(query);

    return fetcher<ClientTransaction[]>({
      url: `transaction/?${queryString}`,
    });
  }

  getExpensesName(branchId: number) {
    return fetcher<{ label: string }[]>({
      url: `transaction/expenses/name/${branchId}`,
    });
  }
}

export const transactionRepository = new TransactionRepository();
