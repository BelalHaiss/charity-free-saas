import { z, ZodType } from "zod";
import { ValidationSchemas } from "./schema.util";
import { Locale } from "@shared/types/util.types";
import {
  CreateFinancialBenefitPayload,
  CreateNewItem,
  EditFinancialBenefitPayload,
  EditItemPayload,
} from "@shared/types/benefit/benefit.dto";

export const benefitItemSchema = (locale: Locale) =>
  z.object({
    name: ValidationSchemas.getStringSchema(locale),
    qty: ValidationSchemas.getNumberSchema(locale),
    category_id: ValidationSchemas.getPositiveIntegerNumberSchema(locale),
    unit_id: ValidationSchemas.getPositiveIntegerNumberSchema(locale),
    branch_id: ValidationSchemas.getPositiveIntegerNumberSchema(locale),
  }) satisfies ZodType<CreateNewItem>;

const editBenefitItemSchema = (locale: Locale) =>
  benefitItemSchema(locale)
    .pick({
      name: true,
      category_id: true,
      qty: true,
    })
    .extend({
      id: ValidationSchemas.getPositiveIntegerNumberSchema(locale),
    }) satisfies ZodType<EditItemPayload>;

export const createBenefitItemPayloadSchema = (locale: Locale) =>
  ValidationSchemas.getArraySchema(
    locale,
    benefitItemSchema(locale),
  ) satisfies ZodType<CreateNewItem[]>;

export const editBenefitItemPayloadSchema = (locale: Locale) =>
  ValidationSchemas.getArraySchema(
    locale,
    editBenefitItemSchema(locale),
  ) satisfies ZodType<EditItemPayload[]>;

const newFinancialItemSchema = (locale: Locale) =>
  z.object({
    name: ValidationSchemas.getStringSchema(locale),
    unit_id: ValidationSchemas.getPositiveIntegerNumberSchema(locale),
    amount: ValidationSchemas.getNumberSchema(locale),
  }) satisfies ZodType<CreateFinancialBenefitPayload>;

const editFinancialItemSchema = (locale: Locale) =>
  newFinancialItemSchema(locale)
    .pick({
      name: true,
      amount: true,
    })
    .extend({
      id: ValidationSchemas.getPositiveIntegerNumberSchema(locale),
    }) satisfies ZodType<EditFinancialBenefitPayload>;

export const createFinancialItemsPayloadSchema = (locale: Locale) =>
  ValidationSchemas.getArraySchema(
    locale,
    newFinancialItemSchema(locale),
  ) satisfies ZodType<CreateFinancialBenefitPayload[]>;

export const editFinancialItemsPayloadSchema = (locale: Locale) =>
  ValidationSchemas.getArraySchema(
    locale,
    editFinancialItemSchema(locale),
  ) satisfies ZodType<EditFinancialBenefitPayload[]>;
