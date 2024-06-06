import { FormField } from '@render/types/form.types';
import { sponsorshipOptions } from '@render/utils/seed/sponsorship.seed';
import { useI18n } from 'vue-i18n';

export const useBranchForm = () => {
  // @ts-ignore
  const { locale, t } = useI18n<any, 'ar' | 'en'>({});

  const fieldList: FormField<string>[] = [
    {
      name: 'branch.name',
      label: t('organization.form.branch_name'),
      type: 'text'
    },
    {
      name: 'branch.address',
      label: t('organization.form.branch_address'),
      type: 'text'
    },
    {
      name: 'branch.phone',
      label: t('shared.form.phone'),
      type: 'number'
    },
    {
      name: 'branch.scheduled_visits',
      label: t('organization.form.scheduled_visits'),
      type: 'checkbox'
    },
    {
      name: 'branch.sponsorships_cases',
      inputProps: { options: sponsorshipOptions[locale.value] },
      label: t('organization.form.sponsorship_cases'),
      type: 'multi-select-creatable'
    }
  ];

  return { fieldList };
};
