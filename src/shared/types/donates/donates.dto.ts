import { ISO_8601_DateString } from "../util.types";
import { NewTransaction, TransactionDTO } from "../transaction/transaction.dto";
import { WithTempId } from "@render/types/util.types";
import { Donate, Prisma, UNIT_SIZE } from "@prisma/client";
import { DecimalToNumber } from "@render/modules/transaction/types/transactions.types";

export type QueryDonateByDate = {
  date: ISO_8601_DateString;
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
    donate_items: true;
  };
}> & { transaction?: TransactionDTO | null };

export type ClientDonateWithRelations = DecimalToNumber<DonateWithRelations>;
