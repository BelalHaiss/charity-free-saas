import { Locale } from "@render/config/i18n";
import primeI18n from "./prime-i18n.json";
import type { PrimeVueLocaleOptions } from "primevue/config";

export const formErrorsMsgs = {
  shortName: "shared.form.errors.short_field",
  date: "shared.form.errors.date",
  minSelected: "shared.form.errors.min_selected",
};

export const getPrimeLocale = (locale: Locale): PrimeVueLocaleOptions =>
  primeI18n[locale];
