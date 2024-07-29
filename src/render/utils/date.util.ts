import { Locale } from "@render/config/i18n";
import { DateTime } from "luxon";
import { Ref } from "vue";
type DateFormats = "d / L / y" | "yyyy-LL-dd";
export const formatDate = (
  date: Date | string,
  locale: Locale,
  format: DateFormats,
): string => {
  return DateTime.fromJSDate(new Date(date))
    .setLocale(locale === "ar" ? "ar-EG" : "en")
    .toFormat(format);
};

export const formatDateRefToIso = (date: Ref<Date>) =>
  formatDate(date.value, "en", "yyyy-LL-dd");
