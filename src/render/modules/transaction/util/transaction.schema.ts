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

const newDonateItemSchema = z.object({
  item_id: z.number(),
  unit_value: z.number(),
  tempId: z.number(),
  unitSize: z.enum(["LG", "SM"]),
  unitId: z.number(),
}) satisfies ZodType<PartialDonateItem>;

export const newDonateSchema = z.object({
  donor: z.string().min(1),
  donor_phone: z.coerce.string().min(1),
  created_by: z.string().min(1),
  branch_id: z.number().min(0),
  financialTransaction: newExpenseSchema,
  items: z.array(newDonateItemSchema),
  date: z.date(),
}) satisfies ZodType<NewDonate>;
