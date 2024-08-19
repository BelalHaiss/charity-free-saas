import { Donate, Prisma, UNIT_SIZE } from "@prisma/client";
import { DateQueryString } from "../util.types";
import { NewTransaction } from "../transaction/transaction.dto";
import { WithTempId } from "@render/types/util.types";

export type QueryDonateByDate = {
  date: DateQueryString;
  branchId: number;
};

export type NewDonate = Pick<
  Donate,
  "branch_id" | "created_by" | "donor" | "donor_phone"
> & {
  financialTransaction: NewTransaction;
  items: PartialDonateItem[];
  date: Date;
};

type NewDonateItem = Omit<
  Prisma.DonateItemUncheckedCreateInput,
  "donate_id" | "id"
> & { unitSize: UNIT_SIZE; unitId: number };

export type PartialDonateItem = WithTempId<Partial<NewDonateItem>>;
