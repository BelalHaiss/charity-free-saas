import { DateTime } from "luxon";
import { Ref } from "vue";
type DateFormats = "d / L / y" | "yyyy-LL-dd" | "tt";
export const formatDate = (
  date: Date | string,
  format: DateFormats,
): string => {
  return DateTime.fromJSDate(new Date(date)).toFormat(format);
};

export const formatDateRefToIsoDateOnly = (date: Ref<Date>) =>
  DateTime.fromJSDate(new Date(date.value)).toFormat("yyyy-LL-dd");
