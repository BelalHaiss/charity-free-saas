import { MoneyUnit } from "@prisma/client";
import { i18nConfig } from "@render/config/i18n";

export const getCodeLabel = (unit: MoneyUnit) =>
  i18nConfig.global.locale.value === "ar" ? unit["ar_code"] : unit["en_code"];

export const getLabel = (unit: MoneyUnit) =>
  i18nConfig.global.locale.value === "ar" ? unit["ar_name"] : unit["en_name"];
