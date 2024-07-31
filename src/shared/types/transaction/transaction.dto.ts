import { TransactionType } from "@prisma/client";
import { DateQueryString } from "../util.types";

export type TransactionQueryByType = {
  type: TransactionType;
  date: DateQueryString;
  branchId: number;
};
