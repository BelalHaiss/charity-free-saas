import { Transaction, Unit } from "@prisma/client";

// export function groupAndSumTransactions(
//   transactions: Transaction[],
//   units: Unit[]
// ): Record<string, number> {
//   const groupedTransactions: Record<string, number> = {};

//   transactions.forEach((transaction) => {
//     const { amount, unit_id } = transaction;
//     const convertedAmount = amount;
//     const currency = units.find((unit) => unit.id === unit_id)!.label;
//     if (groupedTransactions[currency]) {
//       groupedTransactions[currency] += convertedAmount;
//     } else {
//       groupedTransactions[currency] = convertedAmount;
//     }
//   });

//   return groupedTransactions;
// }
