import { MoneyUnit, Unit } from "@prisma/client";
import { Decimal } from "decimal.js/decimal";
import {
  ClientTransaction,
  TransactionGroup,
  TransactionItem,
} from "../types/transactions.types";
import { Locale } from "@render/config/i18n";

export function groupAndSumTransactions(
  transactions: ClientTransaction[],
  units: MoneyUnit[],
  locale: Locale,
): TransactionGroup {
  const groupedTransactions: TransactionGroup = {};

  transactions.forEach((transaction) => {
    const { amount, unit_id } = transaction;

    const unit = units.find((unit) => unit.id === unit_id)!;
    const currency = locale === "ar" ? unit.ar_code : unit.en_code;
    const decimalAmount = new Decimal(amount);
    if (groupedTransactions[currency]) {
      groupedTransactions[currency] =
        groupedTransactions[currency].add(decimalAmount);
    } else {
      groupedTransactions[currency] = decimalAmount;
    }
  });

  return groupedTransactions;
}

export const getTransactionNet = (
  incomes: TransactionGroup,
  expenses: TransactionGroup,
): TransactionGroup => {
  const groupedTransactions: TransactionGroup = {};

  for (const [unitLabel, income] of Object.entries(incomes)) {
    if (groupedTransactions[unitLabel] === undefined) {
      groupedTransactions[unitLabel] = new Decimal(income);
    } else {
      groupedTransactions[unitLabel] =
        groupedTransactions[unitLabel].plus(income);
    }
  }

  // Process expenses
  for (const [unitLabel, expense] of Object.entries(expenses)) {
    if (groupedTransactions[unitLabel] === undefined) {
      groupedTransactions[unitLabel] = new Decimal(-expense);
    } else {
      groupedTransactions[unitLabel] =
        groupedTransactions[unitLabel].minus(expense);
    }
  }

  return groupedTransactions;
};

// Convert TransactionGroup object to an array of TransactionItem
export const convertTransactionGroupToArray = (
  transactionGroup: TransactionGroup,
): TransactionItem[] => {
  return Object.entries(transactionGroup).map(([unitLabel, amount]) => ({
    unitLabel,
    amount,
  }));
};
