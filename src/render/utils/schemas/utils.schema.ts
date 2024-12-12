import { Locale } from "@shared/types/util.types";
import {
  CreatableSelectOptions,
  SelectOptions,
} from "@render/types/form.types";
import { ValidationSchemas } from "@shared/services/schema/schema.util";
import { ZodType, z } from "zod";

export const selectStringSchema = (locale: Locale) =>
  z.object({
    label: ValidationSchemas.getStringSchema(locale),
    value: ValidationSchemas.getStringSchema(locale),
  }) satisfies ZodType<SelectOptions<string>>;

export const creatableSelectStringSchema = (locale: Locale) =>
  z.object({
    label: ValidationSchemas.getStringSchema(locale),
    value: ValidationSchemas.getStringSchema(locale),
    isCreated: ValidationSchemas.getBooleanSchema(locale).optional(),
  }) satisfies ZodType<CreatableSelectOptions<string>>;
