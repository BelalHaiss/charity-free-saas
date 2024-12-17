import { Locale } from "./types/util.types";

// Define the structure of error messages
type ErrorMessages = {
  noUsernameFound: string;
  passwordWrong: string;
  unauthorizedAccess: string;
  invalidToken: string;
  userNotActive: string;
  internalServerError: string;
  resourceNotFound: string;
  fieldRequired: string;
  operationFailed: string;
};

const errorMessages: Record<Locale, ErrorMessages> = {
  en: {
    noUsernameFound: "No user found with the provided username.",
    passwordWrong: "The password you entered is incorrect.",
    unauthorizedAccess: "Unauthorized access. Please log in.",
    invalidToken: "Invalid token. Authentication failed.",
    userNotActive: "Your account is not active. Contact support.",
    internalServerError:
      "An unexpected error occurred. Please try again later.",
    resourceNotFound: "The requested resource was not found.",
    fieldRequired: "This field is required.",
    operationFailed: "The operation could not be completed.",
  },
  ar: {
    noUsernameFound: "لم يتم العثور على مستخدم بالاسم المدخل.",
    passwordWrong: "كلمة المرور التي أدخلتها غير صحيحة.",
    unauthorizedAccess: "الوصول غير مصرح به. يرجى تسجيل الدخول.",
    invalidToken: "الرمز المميز غير صالح. فشل التوثيق.",
    userNotActive: "حسابك غير مفعل. تواصل مع الدعم.",
    internalServerError: "حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.",
    resourceNotFound: "المورد المطلوب غير موجود.",
    fieldRequired: "هذا الحقل مطلوب.",
    operationFailed: "تعذر إكمال العملية.",
  },
};

export function getLocalizedErrorMessage(
  locale: Locale,
  errorKey: keyof ErrorMessages,
) {
  return errorMessages[locale][errorKey];
}
