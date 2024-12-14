import { Locale } from "@shared/types/util.types";
import { ValidationSchemas } from "@shared/services/schema/schema.util";
import {
  NewDonate,
  PartialDonateItem,
} from "@shared/types/donates/donates.dto";
import { NewTransaction } from "@shared/types/transaction/transaction.dto";
import { z, ZodType } from "zod";

export const newExpenseSchema = (locale: Locale) =>
  z.object({
    created_by: ValidationSchemas.getStringSchema(locale),
    unit_id: ValidationSchemas.getPositiveIntegerNumberSchema(locale),
    amount: ValidationSchemas.getNumberSchema(locale, 0.1),
    label: ValidationSchemas.getStringSchema(locale),
    type: ValidationSchemas.getEnumSchema(locale, ["EXPENSE"] as const),
    branch_id: ValidationSchemas.getPositiveIntegerNumberSchema(locale),
  }) satisfies ZodType<NewTransaction>;

export const newFinancialDonateSchema = (locale: Locale) =>
  z.object({
    unit_id: ValidationSchemas.getPositiveIntegerNumberSchema(locale),
    amount: ValidationSchemas.getPositiveIntegerNumberSchema(locale),
    branch_id: ValidationSchemas.getPositiveIntegerNumberSchema(locale),
  }) satisfies ZodType<NewDonate["financialTransaction"]>;

export const newDonateItemSchema = (locale: Locale) =>
  z.object({
    item_id: ValidationSchemas.getPositiveIntegerNumberSchema(locale),
    unit_value: ValidationSchemas.getPositiveIntegerNumberSchema(locale, 1),
    tempId: ValidationSchemas.getPositiveIntegerNumberSchema(locale),
    unitSize: ValidationSchemas.getEnumSchema(locale, ["LG", "SM"] as const),
    unitId: ValidationSchemas.getPositiveIntegerNumberSchema(locale),
  }) satisfies ZodType<PartialDonateItem>;
