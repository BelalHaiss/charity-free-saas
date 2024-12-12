import { ZodType, z } from "zod";
import { createOrganizationSchema } from "./organization.schema";
import { newBranchSchema } from "./branch.schema";
import { userSchema } from "./user.schema";
import { InitialSetupClient } from "@shared/types/setup/initial.dto";
import { Locale } from "@shared/types/util.types";
import { ValidationSchemas } from "./schema.util";

export const initialSetupSchema = (locale: Locale) =>
  z.object({
    organization: createOrganizationSchema(locale),
    branch: newBranchSchema(locale),
    adminUser: userSchema.initialAdminWithBranches(locale),
    lang: ValidationSchemas.getEnumSchema(locale, ["ar", "en"] as const),
  }) satisfies ZodType<InitialSetupClient>;

export const initialUiOrganizationSchema = (locale: Locale) =>
  z.object({
    organization: createOrganizationSchema(locale),
    branch: newBranchSchema(locale),
  });
