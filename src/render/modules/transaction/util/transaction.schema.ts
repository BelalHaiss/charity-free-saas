import {
  NewDonate,
  PartialDonateItem,
} from "@shared/types/donates/donates.dto";
import { NewTransaction } from "@shared/types/transaction/transaction.dto";
import { z, ZodType } from "zod";

export const newExpenseSchema = z.object({
  created_by: z.string().min(1),
  unit_id: z.number(),
  amount: z.number().min(0.1),
  label: z.string().min(1),
  type: z.enum(["EXPENSE"]),
  branch_id: z.number(),
}) satisfies ZodType<NewTransaction>;

export const newFinancialDonateSchema = z.object({
  unit_id: z.number(),
  amount: z.number(),
  branch_id: z.number(),
}) satisfies ZodType<NewDonate["financialTransaction"]>;

export const newDonateItemSchema = z.object({
  item_id: z.number(),
  unit_value: z.number(),
  tempId: z.number(),
  unitSize: z.enum(["LG", "SM"]),
  unitId: z.number(),
}) satisfies ZodType<PartialDonateItem>;
