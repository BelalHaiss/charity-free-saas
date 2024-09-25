import { DateQueryString } from "../util.types";
import { NewTransaction } from "../transaction/transaction.dto";
import { WithTempId } from "@render/types/util.types";
import { Donate, Prisma, UNIT_SIZE } from "@prisma/client";

export type QueryDonateByDate = {
  date: DateQueryString;
  branchId: number;
};

type FinancialDonateTransaction = Pick<
  NewTransaction,
  "amount" | "branch_id" | "unit_id"
>;

export type NewDonate = Pick<
  Donate,
  "branch_id" | "created_by" | "donor" | "donor_phone"
> & {
  financialTransaction: FinancialDonateTransaction;
  items?: PartialDonateItem[];
  date: Date;
};

type NewDonateItem = Omit<
  Prisma.DonateItemUncheckedCreateInput,
  "donate_id" | "id"
> & { unitSize: UNIT_SIZE; unitId: number };

export type PartialDonateItem = WithTempId<Partial<NewDonateItem>>;

export type DonateWithRelations = Prisma.DonateGetPayload<{
  include: {
    transaction: true;
    donate_items: true;
  };
}>;
