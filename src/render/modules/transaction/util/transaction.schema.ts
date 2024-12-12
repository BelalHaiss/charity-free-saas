import { Locale } from "@shared/types/util.types";
import { ValidationSchemas } from "@shared/services/schema/schema.util";
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

export const newFinancialDonateSchema = (locale: Locale) =>
  z.object({
    unit_id: ValidationSchemas.getNumberSchema(locale),
    amount: ValidationSchemas.getNumberSchema(locale),
    branch_id: ValidationSchemas.getNumberSchema(locale),
  }) satisfies ZodType<NewDonate["financialTransaction"]>;

export const newDonateItemSchema = (locale: Locale) =>
  z.object({
    item_id: ValidationSchemas.getNumberSchema(locale),
    unit_value: ValidationSchemas.getNumberSchema(locale, 1),
    tempId: ValidationSchemas.getNumberSchema(locale),
    unitSize: ValidationSchemas.getEnumSchema(locale, ["LG", "SM"] as const),
    unitId: ValidationSchemas.getNumberSchema(locale),
  }) satisfies ZodType<PartialDonateItem>;
