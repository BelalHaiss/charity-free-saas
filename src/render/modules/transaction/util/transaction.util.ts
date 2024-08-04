import { Unit } from "@prisma/client";
import { Decimal } from "decimal.js/decimal";
import {
  ClientTransaction,
  TransactionGroup,
  TransactionItem,
} from "../types/transactions.types";

export function groupAndSumTransactions(
  transactions: ClientTransaction[],
  units: Unit[],
): TransactionGroup {
  const groupedTransactions: TransactionGroup = {};

  transactions.forEach((transaction) => {
    const { amount, unit_id } = transaction;

    const unit = units.find((unit) => unit.id === unit_id)!;
    const currency = unit.label;
    const convertedAmount = new Decimal(amount).mul(unit.sm_to_bg_factor);
    if (groupedTransactions[currency]) {
      groupedTransactions[currency] =
        groupedTransactions[currency].add(convertedAmount);
    } else {
      groupedTransactions[currency] = convertedAmount;
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
