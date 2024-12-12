import { OrganizationToServer } from "@shared/types/organization/organization.dto";
import { Locale } from "@shared/types/util.types";
import { ZodType, z } from "zod";
import { ValidationSchemas } from "./schema.util";

export const createOrganizationSchema = (locale: Locale) =>
  z.object({
    name: ValidationSchemas.getStringSchema(locale),
    created_at: ValidationSchemas.getDateSchema(locale),
  }) satisfies ZodType<OrganizationToServer>;
