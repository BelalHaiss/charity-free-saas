import { Prisma, TransactionType } from "@prisma/client";
import { ISO_8601_DateString } from "../util.types";

export type TransactionQueryByType = {
  type: TransactionType;
  date: ISO_8601_DateString;
  branchId: number;
};

export type NewTransaction = Omit<
  Prisma.TransactionUncheckedCreateInput,
  "created_at" | "amount"
> & {
  date: Date;
  amount: number;
};
