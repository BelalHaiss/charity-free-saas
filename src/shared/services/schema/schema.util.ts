import { Locale } from '@shared/types/util.types';
import { z, ZodType } from 'zod';

// matches DECIMAL(19,4)
export const amountSchema = z
  .string()
  .regex(/^-?\d{1,15}(\.\d{1,4})?$/, {
    message: 'Amount must be up to 19 digits total with max 4 decimal places'
  })
  .transform((val) => {
    // normalize to string with max 4 decimals
    const num = Number(val);
    return num.toFixed(4).replace(/\.?0+$/, ''); // e.g., 123.4000 -> "123.4"
  });

// Optional: allow number input directly
export const amountSchemaFlexible = z.union([
  z.number().refine(
    (val) => {
      const [int, frac = ''] = val.toString().split('.');
      return int.length <= 15 && frac.length <= 4;
    },
    { message: 'Amount must be within DECIMAL(19,4) range' }
  ),
  amountSchema
]);

type TranslatedTypeObject = {
  required: () => string;
  email: () => string;
  typeNumber: () => string;
  typeString: () => string;
  min: (min: number) => string;
  max: (max: number) => string;
  minNumber: (min: number) => string;
  maxNumber: (max: number) => string;
  minPhoneNumber: (min: number) => string;
  maxPhoneNumber: (max: number) => string;
  invalidPhoneNumber: () => string;
  invalidDate: () => string;
  positiveNumber: () => string;
  integer: () => string;
  arrayMin: (min: number) => string;
  arrayMax: (max: number) => string;
  singleDonateRequired: () => string;
  invalidAmount: () => string;
  amountOutOfRange: () => string;
};

export const validationMessages: Record<Locale, TranslatedTypeObject> = {
  en: {
    required: () => 'This field is required',
    typeNumber: () => 'Value must be a number',
    typeString: () => 'Value must be a text',
    email: () => 'Please enter a valid email',
    min: (min: number) => `Must be at least ${min} characters`,
    max: (max: number) => `Must be no more than ${max} characters`,
    minNumber: (min: number) => `Must be at least ${min}`,
    maxNumber: (max: number) => `Must be no more than ${max}`,
    minPhoneNumber: (min: number) =>
      `The phone number must be at least ${min} characters.`,
    maxPhoneNumber: (max: number) =>
      `The phone number must be at most ${max} characters.`,
    invalidPhoneNumber: () => 'Invalid phone number format.',

    invalidDate: () => 'Please enter a valid date',
    positiveNumber: () => 'Must be a positive number',
    integer: () => 'Please enter a valid integer',
    arrayMin: (min: number) => `Select at least ${min} items`,
    arrayMax: (max: number) => `Don't select more than ${max} items`,
    singleDonateRequired: () =>
      'You must add either a financial transaction amount or at least one item.',
    invalidAmount: () =>
      'Amount must be up to 19 digits total with max 4 decimal places',
    amountOutOfRange: () => 'Amount must be within DECIMAL(19,4) range'
  },
  ar: {
    required: () => 'هذا الحقل مطلوب',
    email: () => 'يرجى إدخال بريد إلكتروني صالح',
    typeNumber: () => 'القيمة يجب ان تكون رقم',
    typeString: () => 'القيمة يجب ان تكون كلم',
    min: (min: number) => `يجب أن يكون على الأقل ${min} حرفًا`,
    max: (max: number) => `يجب ألا يزيد عن ${max} حرفًا`,
    minNumber: (min: number) => `يجب أن يكون على الأقل ${min}`,
    maxNumber: (max: number) => `يجب ألا يزيد عن ${max}`,
    minPhoneNumber: (min: number) =>
      `يجب أن يحتوي رقم الهاتف على ${min} أحرف على الأقل.`,
    maxPhoneNumber: (max: number) => `يجب ألا يزيد رقم الهاتف عن ${max} أحرف.`,
    invalidPhoneNumber: () => 'تنسيق رقم الهاتف غير صالح.',

    invalidDate: () => 'يرجى إدخال تاريخ صالح',
    positiveNumber: () => 'يجب أن يكون رقمًا موجبًا',
    integer: () => 'يرجى إدخال رقم صحيح',
    arrayMin: (min: number) => `حدد على الأقل ${min} عنصرًا`,
    arrayMax: (max: number) => `لا تحدد أكثر من ${max} عنصرًا`,
    singleDonateRequired: () => 'يجب إضافة مبلغ مالي أو عنصر واحد على الأقل.',
    invalidAmount: () =>
      'يجب أن يكون المبلغ حتى 19 رقمًا بحد أقصى 4 أرقام عشرية',
    amountOutOfRange: () => 'يجب أن يكون المبلغ ضمن نطاق DECIMAL(19,4)'
  }
};

export abstract class ValidationSchemas {
  static getStringSchema(lang: Locale, min?: number, max?: number) {
    const messages = validationMessages[lang];
    return z
      .string({
        required_error: messages.required(),
        invalid_type_error: messages.typeString()
      })
      .min(min || 1, { message: messages.min?.(min || 1) })
      .max(max || Infinity, { message: messages.max?.(max || Infinity) });
  }

  static getOptionalStringSchema(lang: Locale, min?: number, max?: number) {
    const messages = validationMessages[lang];
    return z
      .string({
        invalid_type_error: messages.typeString()
      })
      .min(min || 1, { message: messages.min?.(min || 1) })
      .max(max || Infinity, { message: messages.max?.(max || Infinity) })
      .optional();
  }

  static getPhoneNumberSchema(lang: Locale, min?: number, max?: number) {
    const messages = validationMessages[lang];
    return z
      .string({
        required_error: messages.required(),
        invalid_type_error: messages.invalidPhoneNumber()
      })
      .min(min || 5, { message: messages.minPhoneNumber(min || 5) })
      .max(max || Infinity, { message: messages.maxPhoneNumber(max || 0) });
  }

  static getPositiveIntegerNumberSchema(
    lang: Locale,
    min?: number,
    max?: number
  ) {
    const messages = validationMessages[lang];
    return z
      .number({
        required_error: messages.required(),
        invalid_type_error: messages.typeNumber()
      })
      .min(min || -Infinity, { message: messages.minNumber(min || 0) })
      .max(max || Infinity, { message: messages.maxNumber(max || 0) })
      .positive({ message: messages.positiveNumber() })
      .int({ message: messages.integer() });
  }

  static getNumberSchema(lang: Locale, min?: number, max?: number) {
    const messages = validationMessages[lang];
    return z
      .number({
        required_error: messages.required(),
        invalid_type_error: messages.typeNumber()
      })
      .min(min || -Infinity, { message: messages.minNumber(min || 0) })
      .max(max || Infinity, { message: messages.maxNumber(max || 0) });
  }

  static getOptionalNumberSchema(lang: Locale, min?: number, max?: number) {
    const messages = validationMessages[lang];
    return z
      .number({
        invalid_type_error: messages.typeNumber()
      })
      .min(min || -Infinity, { message: messages.minNumber(min || 0) })
      .max(max || Infinity, { message: messages.maxNumber(max || 0) })
      .optional();
  }

  static getArraySchema<T>(
    lang: Locale,
    itemSchema: ZodType<T>,
    min?: number,
    max?: number
  ) {
    const messages = validationMessages[lang];
    return z
      .array(itemSchema)
      .min(min || 0, { message: messages.arrayMin?.(min || 0) })
      .max(max || Infinity, { message: messages.arrayMax?.(max || Infinity) });
  }

  static getDateSchema(lang: Locale) {
    const messages = validationMessages[lang];
    return z.date({
      required_error: messages.required(),
      invalid_type_error: messages.invalidDate()
    });
  }

  static dateString(lang: Locale) {
    const messages = validationMessages[lang];

    return z
      .string({
        required_error: messages.required(),
        invalid_type_error: messages.invalidDate()
      })
      .refine(
        (value) => {
          return !isNaN(Date.parse(value));
        },
        {
          message: messages.invalidDate()
        }
      );
  }

  static getBooleanSchema(lang: Locale) {
    const messages = validationMessages[lang];
    return z.boolean({
      required_error: messages.required()
    });
  }

  static getEnumSchema<T extends string>(
    lang: Locale,
    validValues: readonly T[]
  ) {
    const messages = validationMessages[lang];
    return z.enum(validValues as [T, ...T[]], {
      required_error: messages.required()
    });
  }

  static getEmailSchema(lang: Locale) {
    const messages = validationMessages[lang];
    return z
      .string({
        required_error: messages.required()
      })
      .email({ message: messages.email() });
  }

  static getAmountSchema(lang: Locale) {
    const messages = validationMessages[lang];
    return z
      .string()
      .regex(/^-?\d{1,15}(\.\d{1,4})?$/, {
        message: messages.invalidAmount()
      })
      .transform((val) => {
        // normalize to string with max 4 decimals
        const num = Number(val);
        return num.toFixed(4).replace(/\.?0+$/, ''); // e.g., 123.4000 -> "123.4"
      });
  }

  static getAmountSchemaFlexible(lang: Locale) {
    const messages = validationMessages[lang];
    return z.union([
      z.number().refine(
        (val) => {
          const [int, frac = ''] = val.toString().split('.');
          return int.length <= 15 && frac.length <= 4;
        },
        { message: messages.amountOutOfRange() }
      ),
      z
        .string()
        .regex(/^-?\d{1,15}(\.\d{1,4})?$/, {
          message: messages.invalidAmount()
        })
        .transform((val) => Number(val))
    ]);
  }

  static getAmountSchemaFlexibleString(lang: Locale) {
    const messages = validationMessages[lang];
    return z.union([
      z.number().refine(
        (val) => {
          const [int, frac = ''] = val.toString().split('.');
          return int.length <= 15 && frac.length <= 4;
        },
        { message: messages.amountOutOfRange() }
      ),
      this.getAmountSchema(lang)
    ]);
  }

  // For form/API input where you want to allow flexible input but satisfy strict DTO contracts
  static getAmountSchemaForContract(lang: Locale) {
    const messages = validationMessages[lang];
    return z.coerce.number().refine(
      (val) => {
        const str = val.toString();
        return /^-?\d{1,15}(\.\d{1,4})?$/.test(str);
      },
      { message: messages.invalidAmount() }
    );
  }
}
