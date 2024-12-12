import { Locale } from "@shared/types/util.types";
import primeI18n from "./prime-i18n.json";
import type { PrimeVueLocaleOptions } from "primevue/config";

export const getPrimeLocale = (locale: Locale): PrimeVueLocaleOptions =>
  primeI18n[locale];
