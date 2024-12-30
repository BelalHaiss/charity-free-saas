import { CreateNewItem } from "@shared/types/benefit/benefit.dto";
import { z, ZodType } from "zod";

export const newItemSchema = z.object({
  name: z.string(),
  qty: z.number().min(0),
  category_id: z.number().min(1),
  unit_id: z.number().min(1),
  branch_id: z.number().min(1),
}) satisfies ZodType<CreateNewItem>;
