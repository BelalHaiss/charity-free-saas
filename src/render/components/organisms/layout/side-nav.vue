<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router/auto';
import { RouteNamedMap } from 'vue-router/auto-routes';
import FeArrowRight from '~icons/fe/arrow-right';
type Path = { label: string; path: keyof RouteNamedMap };
type NavItem = { header: string; paths: Path[] };
const { t } = useI18n();

const navItems: NavItem[] = [
  {
    header: t('shared.pages.beneficiaries'),
    paths: [
      { label: t('shared.pages.beneficiaries_show'), path: '/beneficiaries/' },
      {
        label: t('shared.pages.add_beneficiary'),
        path: '/beneficiaries/create'
      }
    ]
  },
  {
    header: t('shared.pages.visits'),
    paths: [
      { label: t('shared.pages.visits_show'), path: '/visits/' },
      { label: t('shared.pages.add_visit'), path: '/visits/create' }
    ]
  },
  {
    header: t('shared.pages.benefits'),
    paths: [
      { label: t('shared.pages.benefits_items'), path: '/benefits/items' },
      { label: t('shared.pages.benefits_finance'), path: '/benefits/finance' }
    ]
  },
  {
    header: t('shared.pages.settings'),
    paths: [
      {
        label: t('shared.details', { label: t('shared.organization') }),
        path: '/settings/info'
      },
      {
        label: t('shared.pages.settings_user'),
        path: '/settings/users/manage'
      },
      {
        label: t('shared.pages.settings_user_roles'),
        path: '/settings/users/roles'
      },
      {
        label: t('shared.pages.settings_unit'),
        path: '/settings/units'
      }
    ]
  },
  {
    header: t('shared.pages.reports'),
    paths: [
      {
        label: t('shared.pages.reports_daily'),
        path: '/reports/daily'
      },
      {
        label: t('shared.pages.reports_donates'),
        path: '/reports/donates'
      }
    ]
  }
];
</script>
<template>
  <nav class="min-h-full max-h-full bg-white rounded-2xl p-4 w-[170px] z-50">
    <div class="flex flex-1 gap-2 flex-col">
      <div v-for="item in navItems" class="group relative">
        <Button text class="flex-center gap-1 w-full">
          {{ item.header }}
          <FeArrowRight class="rtl:rotate-180 ms-auto" />
        </Button>
        <div
          class="hidden min-w-[150px] rounded-lg absolute start-20 group-hover:flex flex-col z-50 gap-2 items-center p-2 bg-white shadow-lg"
        >
          <RouterLink class="w-full" :to="path.path" v-for="path in item.paths">
            <Button class="w-full" text severity="secondary">
              {{ path.label }}
            </Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
