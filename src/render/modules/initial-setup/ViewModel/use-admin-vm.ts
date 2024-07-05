import { Locale } from "@render/config/i18n";
import { FormField } from "@render/types/form.types";
import { useI18n } from "vue-i18n";

export const useAdminForm = () => {
  const { t } = useI18n<object, Locale>();

  const fieldList: FormField<string>[] = [
    {
      name: "adminUser.username",
      label: t("shared.form.username"),
      type: "text",
    },
    {
      name: "adminUser.password",
      label: t("shared.form.password"),
      type: "password",
    },
  ];

  return { fieldList };
};
