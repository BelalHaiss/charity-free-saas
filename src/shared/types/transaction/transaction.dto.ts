import { TransactionType } from "@prisma/client";

export type TransactionQueryByType = {
  type: TransactionType;
  date: string;
  branchId: number;
};
