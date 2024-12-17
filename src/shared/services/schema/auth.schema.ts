import { Locale } from "@shared/types/util.types";
import { ValidationSchemas } from "./schema.util";
import { LoginPayload } from "@shared/types/auth/auth.dto";
import { z, ZodType } from "zod";

export const loginSchema = (locale: Locale) =>
  z.object({
    username: ValidationSchemas.getStringSchema(locale),
    password: ValidationSchemas.getStringSchema(locale),
  }) satisfies ZodType<LoginPayload>;
