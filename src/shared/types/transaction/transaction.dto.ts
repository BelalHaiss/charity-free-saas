import { Prisma, TransactionType } from "@prisma/client";
import { DateQueryString } from "../util.types";

export type TransactionQueryByType = {
  type: TransactionType;
  date: DateQueryString;
  branchId: number;
};

export type NewTransaction = Omit<
  Prisma.TransactionUncheckedCreateInput,
  "created_at" | "amount"
> & {
  date: Date;
  amount: number;
};
