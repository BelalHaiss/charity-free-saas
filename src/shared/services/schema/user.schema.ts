import { ZodType, z } from "zod";
import { InitialAdmin } from "@shared/types/user/user.dto";
import { Locale } from "@shared/types/util.types";
import { ValidationSchemas } from "./schema.util";
const initialAdminWithBranches = (locale: Locale) =>
  z.object({
    username: ValidationSchemas.getStringSchema(locale),
    password: ValidationSchemas.getStringSchema(locale),
    branches: ValidationSchemas.getArraySchema(
      locale,
      ValidationSchemas.getPositiveIntegerNumberSchema(locale),
    ),
  }) satisfies ZodType<InitialAdmin>;

export const userSchema = {
  initialAdminWithBranches,
};
