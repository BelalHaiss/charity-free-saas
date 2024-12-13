import {
  newFinancialDonateSchema,
  newDonateItemSchema,
} from "@render/modules/transaction/util/transaction.schema";
import { NewDonate } from "@shared/types/donates/donates.dto";
import { CastDateFieldsToIsoDate, Locale } from "@shared/types/util.types";
import { z, ZodType } from "zod";
import { validationMessages, ValidationSchemas } from "./schema.util";

export const newDonateSchema = (locale: Locale) =>
  z
    .object({
      donor: ValidationSchemas.getStringSchema(locale),
      donor_phone: ValidationSchemas.getCoerceStringSchema(locale, 1),
      created_by: ValidationSchemas.getStringSchema(locale),
      branch_id: ValidationSchemas.getNumberSchema(locale, 0),
      financialTransaction: newFinancialDonateSchema(locale),
      items: ValidationSchemas.getArraySchema(
        locale,
        newDonateItemSchema(locale),
        1,
      ).optional(),
      date: ValidationSchemas.getDateSchema(locale),
    })
    .refine(
      (values) =>
        values.financialTransaction.amount > 0 ||
        (values.items && values.items?.length > 0),
      {
        path: ["financialTransaction.amount"],
        message: validationMessages[locale].singleDonateRequired(),
      },
    ) satisfies ZodType<NewDonate>;

export const newDonateServerSchema = (locale: Locale) =>
  z
    .object({
      donor: ValidationSchemas.getStringSchema(locale),
      donor_phone: ValidationSchemas.getCoerceStringSchema(locale, 1),
      created_by: ValidationSchemas.getStringSchema(locale),
      branch_id: ValidationSchemas.getNumberSchema(locale, 0),
      financialTransaction: newFinancialDonateSchema(locale),
      items: ValidationSchemas.getArraySchema(
        locale,
        newDonateItemSchema(locale),
        1,
      ).optional(),
      date: ValidationSchemas.dateString(locale),
    })
    .refine(
      (values) =>
        values.financialTransaction.amount > 0 ||
        (values.items && values.items?.length > 0),
      {
        path: ["financialTransaction.amount"],
        message: validationMessages[locale].singleDonateRequired(),
      },
    ) satisfies ZodType<CastDateFieldsToIsoDate<NewDonate>>;
