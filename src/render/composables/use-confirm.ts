import { Ref, ref } from "vue";
import { Locale, useI18n } from "vue-i18n";

export type ConfirmDialogProps = {
  isVisible: Ref<boolean>;
  isSubmitting: Ref<boolean>;
  header?: string;
  description?: string;
  onConfirm(): void;
  onCancel(): void;
};

export const useConfirm = (
  onConfirm: (isSubmitting: Ref<boolean>) => void,
  customProps?: Partial<ConfirmDialogProps>,
) => {
  const { t } = useI18n<object, Locale>();
  const isVisible = ref(false);
  const isSubmitting = ref(false);
  const showDialog = () => {
    console.log("showDialog");
    isVisible.value = true;
  };
  const hideDialog = () => (isVisible.value = false);

  const header = customProps?.header ?? t("shared.actions.confirm-changes");
  const description =
    customProps?.description ?? t("shared.actions.confirm-msg");

  const onCancel = customProps?.onCancel ?? hideDialog;
  return {
    isVisible,
    isSubmitting,
    onCancel,
    onConfirm: () => onConfirm(isSubmitting),
    header,
    description,
    showDialog,
  };
};
