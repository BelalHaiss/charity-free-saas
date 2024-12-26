import ar from "@render/locales/ar/ar.json";
import en from "@render/locales/en/en.json";
import { createI18n } from "vue-i18n";

export const i18nConfig = createI18n({
  locale: "ar",
  fallbackLocale: "en",
  messages: {
    en,
    ar,
  },
  legacy: false,
});
