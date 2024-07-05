import { Locale } from "@render/config/i18n";
import { DateTime } from "luxon";
type DateFormats = "d / L / y";
export const formatDate = (
  date: Date | string,
  locale: Locale,
  format: DateFormats,
): string => {
  return DateTime.fromJSDate(new Date(date))
    .setLocale(locale === "ar" ? "ar-EG" : "en")
    .toFormat(format);
};
