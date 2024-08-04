import { Transaction } from "@prisma/client";
import Decimal from "decimal.js";

export type DecimalToNumber<T extends object> = {
  [K in keyof T]: T[K] extends Decimal ? number : T[K];
};

export type ClientTransaction = DecimalToNumber<Transaction>;

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
