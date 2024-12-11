import { Locale } from "@render/config/i18n";
import { z } from "zod";
type TranslatedTypeObject = {
  required: () => string;
  email: () => string;
  min: (min: number) => string;
  max: (max: number) => string;
  minNumber: (min: number) => string;
  maxNumber: (max: number) => string;
  invalidDate: () => string;
  positiveNumber: () => string;
  integer: () => string;
  arrayMin: (min: number) => string;
  arrayMax: (max: number) => string;
};

const validationMessages: Record<Locale, TranslatedTypeObject> = {
  en: {
    required: () => "This field is required",
    email: () => "Please enter a valid email",
    min: (min: number) => `Must be at least ${min} characters`,
    max: (max: number) => `Must be no more than ${max} characters`,
    minNumber: (min: number) => `Must be at least ${min}`,
    maxNumber: (max: number) => `Must be no more than ${max}`,
    invalidDate: () => "Please enter a valid date",
    positiveNumber: () => "Must be a positive number",
    integer: () => "Please enter a valid integer",
    arrayMin: (min: number) => `Select at least ${min} items`,
    arrayMax: (max: number) => `Don't select more than ${max} items`,
  },
  ar: {
    required: () => "هذا الحقل مطلوب",
    email: () => "يرجى إدخال بريد إلكتروني صالح",
    min: (min: number) => `يجب أن يكون على الأقل ${min} حرفًا`,
    max: (max: number) => `يجب ألا يزيد عن ${max} حرفًا`,
    minNumber: (min: number) => `يجب أن يكون على الأقل ${min}`,
    maxNumber: (max: number) => `يجب ألا يزيد عن ${max}`,
    invalidDate: () => "يرجى إدخال تاريخ صالح",
    positiveNumber: () => "يجب أن يكون رقمًا موجبًا",
    integer: () => "يرجى إدخال رقم صحيح",
    arrayMin: (min: number) => `حدد على الأقل ${min} عنصرًا`,
    arrayMax: (max: number) => `لا تحدد أكثر من ${max} عنصرًا`,
  },
};

export class ValidationSchemas {
  static getStringSchema(lang: Locale, min?: number, max?: number) {
    const messages = validationMessages[lang];
    return z
      .string({
        required_error: messages.required(),
      })
      .min(min || 0, { message: messages.min?.(min || 0) })
      .max(max || Infinity, { message: messages.max?.(max || Infinity) });
  }

  static getNumberSchema(lang: Locale, min?: number, max?: number) {
    const messages = validationMessages[lang];
    return z
      .number({
        required_error: messages.required(),
      })
      .min(min || -Infinity, { message: messages.minNumber?.(min || 0) })
      .max(max || Infinity, { message: messages.maxNumber?.(max || 0) })
      .positive({ message: messages.positiveNumber() })
      .int({ message: messages.integer() });
  }

  static getArraySchema(lang: Locale, min?: number, max?: number) {
    const messages = validationMessages[lang];
    return z
      .array(z.any(), {
        required_error: messages.required(),
      })
      .min(min || 0, { message: messages.arrayMin?.(min || 0) })
      .max(max || Infinity, { message: messages.arrayMax?.(max || Infinity) });
  }

  static getDateSchema(lang: Locale) {
    const messages = validationMessages[lang];
    return z.date({
      required_error: messages.required(),
      invalid_type_error: messages.invalidDate(),
    });
  }
  static getBooleanSchema(lang: Locale) {
    const messages = validationMessages[lang];
    return z.boolean({
      required_error: messages.required(),
    });
  }
}
