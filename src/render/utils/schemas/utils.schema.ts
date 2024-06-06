import { formErrorsMsgs } from '@render/locales/locale.util';
import {
  CreatableSelectOptions,
  SelectOptions
} from '@render/types/form.types';
import { ZodArray, ZodType, z } from 'zod';

export const selectStringSchema = z.object({
  label: z.string(),
  value: z.string()
}) satisfies ZodType<SelectOptions<string>>;

export const creatableSelectStringSchema = z.object({
  label: z.string(),
  value: z.string(),
  isCreated: z.boolean().optional()
}) satisfies ZodType<CreatableSelectOptions<string>>;

export const minStringWithShortErrorMSG = (count = 2) =>
  z.string().min(count, { message: formErrorsMsgs.shortName });

export const moreThanValue = (z: ZodArray<any>, count = 2) =>
  z.min(count, { message: formErrorsMsgs.minSelected });
