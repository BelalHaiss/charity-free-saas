import { Locale } from "@shared/types/util.types";
import { useI18n } from "vue-i18n";

export const useTypedI18n = () => useI18n<object, Locale>();
