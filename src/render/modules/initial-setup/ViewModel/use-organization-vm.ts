import { FormField } from '@render/types/form.types';
import { useI18n } from 'vue-i18n';

export const useOrganizationForm = () => {
  // @ts-ignore
  const { t } = useI18n<any, 'ar' | 'en'>();

  const fieldList: FormField<string>[] = [
    {
      name: 'organization.name',
      label: t('organization.form.organization_name'),
      type: 'text'
    },
    {
      name: 'organization.created_at',
      label: t('organization.form.created_at'),
      type: 'date'
    }
  ];

  return { fieldList };
};
