import { FormField } from "@render/types/form.types";
import { sponsorshipOptions } from "@render/utils/seed/sponsorship.seed";
import { useI18n } from "vue-i18n";

export const useBranchForm = () => {
  const { locale, t } = useI18n<object, "ar" | "en">({});

  const fieldList: FormField<string>[] = [
    {
      name: "branch.name",
      label: t("organization.form.branch_name"),
      type: "text",
    },
    {
      name: "branch.address",
      label: t("organization.form.branch_address"),
      type: "text",
    },
    {
      name: "branch.phone",
      label: t("form.phone"),
      type: "number",
    },
    {
      name: "branch.scheduled_visits",
      label: t("organization.form.scheduled_visits"),
      type: "checkbox",
    },
    {
      name: "branch.sponsorships_cases",
      inputProps: { options: sponsorshipOptions[locale.value] },
      label: t("organization.form.sponsorship_cases"),
      type: "multi-select-creatable",
    },
  ];

  return { fieldList };
};
