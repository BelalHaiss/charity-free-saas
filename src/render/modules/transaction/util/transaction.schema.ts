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
