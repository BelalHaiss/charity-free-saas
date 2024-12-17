import {
  NewTransaction,
  TransactionQueryByType,
} from "@shared/types/transaction/transaction.dto";
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
      url: `/transaction/?${queryString}`,
    });
  }

  getExpensesName(branchId: number) {
    return fetcher<string[]>({
      url: `/transaction/expenses/name/${branchId}`,
    });
  }
  createTransaction(newTransaction: NewTransaction) {
    return fetcher({
      url: "/transaction",
      config: {
        method: "POST",
        data: newTransaction,
      },
    });
  }
  deleteExpense(transactionId: number) {
    return fetcher({
      url: `/transaction/${transactionId}`,
      config: {
        method: "DELETE",
      },
    });
  }
}

export const transactionRepository = new TransactionRepository();
