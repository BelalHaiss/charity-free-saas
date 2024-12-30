import { getServerErrorMessage } from "@render/utils/exception.util";
import { useToast as usePrimeToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";

export const useToast = () => {
  const toast = usePrimeToast();
  const { t } = useI18n();

  type SuccessToastType = "submitted" | "edited" | "deleted";

  const successToast = (type: SuccessToastType = "submitted") => {
    toast.add({
      summary: t(`toast.${type}_success`),
      severity: "success",
      life: 900,
    });
  };

  const failedToast = (error: unknown) => {
    const serverErrorMessage = getServerErrorMessage(error);
    toast.add({
      summary: serverErrorMessage || t("toast.failed"),
      severity: "error",
      life: 900,
    });
  };

  const invalidDataToast = () => {
    toast.add({
      summary: t("toast.invalid_data"),
      severity: "error",
      life: 900,
    });
  };

  const fieldMissingToast = () => {
    toast.add({
      summary: t("toast.please_fill_fields"),
      severity: "error",
      life: 900,
    });
  };

  return { successToast, failedToast, invalidDataToast, fieldMissingToast };
};
