import ar from "@render/locales/ar";
import en from "@render/locales/en";
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
