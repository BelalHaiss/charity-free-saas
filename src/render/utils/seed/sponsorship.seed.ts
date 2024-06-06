import { CreatableSelectOptions } from '@render/types/form.types';

const arSponsorShipsCasesLabels: CreatableSelectOptions<string>[] = [
  { label: 'organization.sponsorship_cases.poor_family', value: 'اسره فقيره' },
  {
    label: 'organization.sponsorship_cases.widow_or_divorcee',
    value: 'ارملة - مطلقه'
  },
  { label: 'organization.sponsorship_cases.orphan', value: 'يتيم' },
  { label: 'organization.sponsorship_cases.elderly_people', value: 'كبار سن' },
  {
    label: 'organization.sponsorship_cases.people_with_disabilities',
    value: 'ذو الاحتياجات الخاصة'
  },
  { label: 'organization.sponsorship_cases.sick_people', value: 'المرضي ' },
  {
    label: 'organization.sponsorship_cases.refugees_and_immigrants',
    value: 'اللاجئون والمهاجرون'
  },
  { label: 'organization.sponsorship_cases.educate', value: 'دعم تعليمي' }
];

const enSponsorShipsCasesLabels: CreatableSelectOptions<string>[] = [
  { label: 'organization.sponsorship_cases.poor_family', value: 'Poor Family' },
  {
    label: 'organization.sponsorship_cases.widow_or_divorcee',
    value: 'Widow or Divorcee'
  },
  { label: 'organization.sponsorship_cases.orphan', value: 'Orphan' },
  {
    label: 'organization.sponsorship_cases.elderly_people',
    value: 'Elderly People'
  },
  {
    label: 'organization.sponsorship_cases.people_with_disabilities',
    value: 'People with Disabilities'
  },
  { label: 'organization.sponsorship_cases.sick_people', value: 'Sick People' },
  {
    label: 'organization.sponsorship_cases.refugees_and_immigrants',
    value: 'Refugees and Immigrants'
  },
  {
    label: 'organization.sponsorship_cases.educate',
    value: 'Education Support'
  }
];

export const sponsorshipOptions = {
  ar: arSponsorShipsCasesLabels,
  en: enSponsorShipsCasesLabels
};
