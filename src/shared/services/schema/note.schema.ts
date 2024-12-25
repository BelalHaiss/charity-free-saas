import { Locale } from "@shared/types/util.types";
import { ZodType, z } from "zod";
import { ValidationSchemas } from "./schema.util";
import {
  CreateNotePayload,
  UpdateNotePayload,
} from "@shared/types/note/note.dto";

export const createNoteSchema = (locale: Locale) =>
  z.object({
    content: ValidationSchemas.getStringSchema(locale),
  }) satisfies ZodType<CreateNotePayload>;

export const updateNoteSchema = (locale: Locale) =>
  z.object({
    content: ValidationSchemas.getStringSchema(locale),
  }) satisfies ZodType<UpdateNotePayload>;
