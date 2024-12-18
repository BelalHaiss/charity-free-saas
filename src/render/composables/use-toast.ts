import { getServerErrorMessage } from "@render/utils/exception.util";
import { useToast as usePrimeToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";

export const useToast = () => {
  const toast = usePrimeToast();
  const { t } = useI18n();

  const successToast = () =>
    toast.add({
      summary: t("shared.toast.success"),
      severity: "success",
      life: 700,
    });

  const failedToast = (error: unknown) => {
    const serverErrorMessage = getServerErrorMessage(error);
    toast.add({
      summary: serverErrorMessage || t("shared.toast.failed"),
      severity: "error",
      life: 700,
    });
  };

  const invalidDataToast = () => {
    toast.add({
      summary: t("shared.toast.invalid_data"),
      severity: "error",
      life: 700,
    });
  };

  const fieldMissingToast = () => {
    toast.add({
      summary: t("shared.toast.please_fill_fields"),
      severity: "error",
      life: 700,
    });
  };

  return { successToast, failedToast, invalidDataToast, fieldMissingToast };
};
