import { useToast as usePrimeToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
export const useToast = () => {
  const toast = usePrimeToast();
  const { t } = useI18n();
  const successToast = () =>
    toast.add({
      summary: t('shared.toast.success'),
      severity: 'success',
      life: 700
    });
  const failedToast = () => {
    console.log('failed toast will fire');
    toast.add({
      summary: t('shared.toast.failed'),
      severity: 'error',
      life: 700
    });
  };

  return { successToast, failedToast };
};
