import { ZodType, z } from "zod";
import { NewBranchData } from "@shared/types/branch/brach.dto";
import { creatableSelectStringSchema } from "@render/utils/schemas/utils.schema";
import { Locale } from "@shared/types/util.types";
import { ValidationSchemas } from "./schema.util";

export const newBranchSchema = (locale: Locale) =>
  z.object({
    name: ValidationSchemas.getStringSchema(locale),
    address: ValidationSchemas.getStringSchema(locale),
    scheduled_visits: ValidationSchemas.getBooleanSchema(locale),
    phone: ValidationSchemas.getCoerceStringSchema(locale),
    sponsorships_cases: ValidationSchemas.getArraySchema(
      locale,
      creatableSelectStringSchema(locale),
      1,
    ),
  }) satisfies ZodType<NewBranchData>;
