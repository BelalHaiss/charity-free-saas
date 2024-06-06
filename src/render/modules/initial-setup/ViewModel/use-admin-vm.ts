import { FormField } from '@render/types/form.types';
import { useI18n } from 'vue-i18n';

export const useAdminForm = () => {
  // @ts-ignore
  const { t } = useI18n<any, 'ar' | 'en'>();

  const fieldList: FormField<string>[] = [
    {
      name: 'adminUser.username',
      label: t('shared.form.username'),
      type: 'text'
    },
    {
      name: 'adminUser.password',
      label: t('shared.form.password'),
      type: 'password'
    }
  ];

  return { fieldList };
};
