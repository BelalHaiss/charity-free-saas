import { ButtonProps } from "primevue/button";
import { Ref, ref } from "vue";
import { Locale, useI18n } from "vue-i18n";

export type ConfirmDialogProps = {
  isVisible: Ref<boolean>;
  isSubmitting: Ref<boolean>;
  header?: string;
  description?: string;
  onCancel(): void;
  confirmButtonSeverity?: ButtonProps["severity"];
};

export type ConfirmReturn = ConfirmDialogProps & {
  onConfirm(): Promise<unknown>;
  showDialog(): void;
};

export const useConfirm = (
  onConfirm: () => Promise<unknown>,
  customProps?: Partial<ConfirmDialogProps>,
): ConfirmReturn => {
  const { t } = useI18n<object, Locale>();
  const isVisible = ref(false);
  const isSubmitting = ref(false);
  const showDialog = () => {
    isVisible.value = true;
  };
  const hideDialog = () => (isVisible.value = false);

  const header = customProps?.header ?? t("actions.confirm-changes");
  const description = customProps?.description ?? t("actions.confirm-msg");

  const onCancel = customProps?.onCancel ?? hideDialog;
  const handleConfirm = async () => {
    try {
      isSubmitting.value = true;
      await onConfirm();
      hideDialog();
    } catch (e) {
      console.error(`error inside confirm dialog ${e}`);
    } finally {
      isSubmitting.value = false;
    }
  };
  return {
    isVisible,
    isSubmitting,
    onCancel,
    onConfirm: handleConfirm,
    header,
    description,
    showDialog,
  };
};
