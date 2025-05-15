import { TransactionDTO } from "@shared/types/transaction/transaction.dto";
import Decimal from "decimal.js";

// Robust utility type that deeply converts Decimal to number throughout nested structures
export type DecimalToNumber<T> = T extends Decimal
  ? number
  : T extends Date
    ? T
    : T extends (infer U)[]
      ? DecimalToNumber<U>[]
      : T extends object
        ? { [K in keyof T]: DecimalToNumber<T[K]> }
        : T;

export type ClientTransaction = DecimalToNumber<TransactionDTO>;

export type TransactionGroup = Record<string, Decimal>;

export type TransactionItem = {
  unitLabel: string;
  amount: Decimal;
};

export type MoneyTotalsBoxes = {
  incomes: TransactionItem[];
  expenses: TransactionItem[];
  net: TransactionItem[];
};
