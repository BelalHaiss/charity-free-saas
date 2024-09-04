import {
  newFinancialDonateSchema,
  newDonateItemSchema,
} from "@render/modules/transaction/util/transaction.schema";
import { NewDonate } from "@shared/types/donates/donates.dto";
import { z, ZodType } from "zod";

export const newDonateSchema = z
  .object({
    donor: z.string().min(1),
    donor_phone: z.coerce.string().min(1),
    created_by: z.string().min(1),
    branch_id: z.number().min(0),
    financialTransaction: newFinancialDonateSchema,
    items: z.array(newDonateItemSchema).min(1).optional(),
    date: z.date(),
  })
  .refine(
    (values) =>
      values.financialTransaction.amount > 0 ||
      (values.items && values.items?.length > 0),
    { path: ["financialTransaction.amount"], message: "not donate added" },
  ) satisfies ZodType<NewDonate>;
