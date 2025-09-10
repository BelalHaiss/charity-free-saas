import type { OrganizationSeed, UserSeed, UnitSeed } from './seed.types';

export const organizationData: OrganizationSeed = {
  id: 1,
  name: 'منظمة التعاون',
  branches: [
    {
      id: 1,
      lang: 'ar',
      name: 'اهل الخير'
    }
  ]
};

export const userData: UserSeed = {
  id: 1,
  username: 'admin',
  password: 'admin', // Will be hashed in the seed function
  lang: 'ar'
};

export const unitsData: UnitSeed[] = [
  {
    id: 3,
    label: 'ع-3ش',
    bg_unit_abbr: 'ع',
    bg_unit_label: 'علبة',
    sm_to_bg_factor: 3,
    sm_unit_abbr: 'ش',
    sm_unit_label: 'شريط',
    category_label: 'قوالب ادوية'
  },
  {
    id: 4,
    label: 'ع-2ش',
    bg_unit_abbr: 'ع',
    bg_unit_label: 'علبة',
    sm_to_bg_factor: 2,
    sm_unit_abbr: 'ش',
    sm_unit_label: 'شريط',
    category_label: 'قوالب ادوية'
  },
  {
    id: 5,
    label: 'ك-10ق',
    bg_unit_abbr: 'ك',
    bg_unit_label: 'كرتونه',
    sm_to_bg_factor: 10,
    sm_unit_abbr: 'ق',
    sm_unit_label: 'قطعة',
    category_label: 'قوالب منتجات'
  }
];
