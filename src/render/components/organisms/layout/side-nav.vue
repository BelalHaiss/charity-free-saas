<script setup lang="ts">
import { FunctionalComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router/auto';
import { RouteNamedMap } from 'vue-router/auto-routes';
import MaterialSymbolsLightViewComfyAltOutlineRounded from '~icons/material-symbols-light/view-comfy-alt-outline-rounded';
import MdiPackageVariantClosedCheck from '~icons/mdi/package-variant-closed-check';
import IconoirPeopleTag from '~icons/iconoir/people-tag';
import StreamlineWarehouse1 from '~icons/streamline/warehouse-1';
import SolarSettingsOutline from '~icons/solar/settings-outline';
import TablerReportMoney from '~icons/tabler/report-money';
import IcBaselineLogout from '~icons/ic/baseline-logout';
import { TreeNode } from 'primevue/treenode';
import { TreeExpandedKeys } from 'primevue/tree';
import MaterialSymbolsGroupAddOutlineRounded from '~icons/material-symbols/group-add-outline-rounded';
import MdiPackageVariantClosedPlus from '~icons/mdi/package-variant-closed-plus';
import StreamlineMoneyCashDollarCoinAccountingBillingPaymentCashCoinCurrencyMoneyFinance from '~icons/streamline/money-cash-dollar-coin-accounting-billing-payment-cash-coin-currency-money-finance';
import IconParkOutlineAdProduct from '~icons/icon-park-outline/ad-product';
import TablerBuildingArch from '~icons/tabler/building-arch';
import MaterialSymbolsLightPersonEditOutlineSharp from '~icons/material-symbols-light/person-edit-outline-sharp';
import MaterialSymbolsLightVerifiedUserOutlineRounded from '~icons/material-symbols-light/verified-user-outline-rounded';
import TablerRulerMeasure from '~icons/tabler/ruler-measure';
import SystemUiconsCalendarLastDay from '~icons/system-uicons/calendar-last-day';
import FluentMoneyHand24Regular from '~icons/fluent/money-hand-24-regular';

const { t } = useI18n();

const navItems: (TreeNode & { customIcon: FunctionalComponent })[] = [
  {
    label: t('shared.pages.beneficiaries'),
    key: 'beneficiaries',
    customIcon: IconoirPeopleTag,
    children: [
      {
        label: t('shared.pages.beneficiaries_show'),
        type: 'child',
        path: '/beneficiaries/',
        customIcon: MaterialSymbolsLightViewComfyAltOutlineRounded
      },
      {
        label: t('shared.pages.add_beneficiary'),
        type: 'child',
        path: '/beneficiaries/create',
        customIcon: MaterialSymbolsGroupAddOutlineRounded
      }
    ]
  },
  {
    label: t('shared.pages.visits'),
    key: 'visits',

    customIcon: MdiPackageVariantClosedCheck,
    children: [
      {
        label: t('shared.pages.visits_show'),
        type: 'child',
        path: '/visits/',
        customIcon: MaterialSymbolsLightViewComfyAltOutlineRounded
      },
      {
        label: t('shared.pages.add_visit'),
        type: 'child',
        path: '/visits/create',
        customIcon: MdiPackageVariantClosedPlus
      }
    ]
  },
  {
    label: t('shared.pages.benefits'),
    customIcon: StreamlineWarehouse1,
    key: 'benefits',
    children: [
      {
        label: t('shared.pages.benefits_items'),
        type: 'child',
        path: '/benefits/items',
        customIcon: IconParkOutlineAdProduct
      },
      {
        label: t('shared.pages.benefits_finance'),
        type: 'child',
        path: '/benefits/finance',
        customIcon:
          StreamlineMoneyCashDollarCoinAccountingBillingPaymentCashCoinCurrencyMoneyFinance
      }
    ]
  },
  {
    label: t('shared.pages.settings'),
    key: 'settings',
    customIcon: SolarSettingsOutline,
    children: [
      {
        label: t('shared.details', { label: t('shared.organization') }),
        type: 'child',
        path: '/settings/info',
        customIcon: TablerBuildingArch
      },
      {
        label: t('shared.pages.settings_user'),
        type: 'child',
        path: '/settings/users/manage',
        customIcon: MaterialSymbolsLightPersonEditOutlineSharp
      },
      {
        label: t('shared.pages.settings_user_roles'),
        type: 'child',
        path: '/settings/users/roles',
        customIcon: MaterialSymbolsLightVerifiedUserOutlineRounded
      },
      {
        label: t('shared.pages.settings_unit'),
        type: 'child',
        path: '/settings/units',
        customIcon: TablerRulerMeasure
      }
    ]
  },
  {
    customIcon: TablerReportMoney,
    key: 'reports',
    label: t('shared.pages.reports'),
    paths: [
      {
        label: t('shared.pages.reports_daily'),
        type: 'child',
        path: '/reports/daily',
        customIcon: SystemUiconsCalendarLastDay
      },
      {
        label: t('shared.pages.reports_donates'),
        type: 'child',
        path: '/reports/donates',
        customIcon: FluentMoneyHand24Regular
      }
    ]
  }
];

const toggleNodeExpand = (node: TreeNode) => {
  const currentState = expandedItems.value[node.key!];
  expandedItems.value[node.key!] = !currentState;
};

const expandedItems = ref<TreeExpandedKeys>({});
</script>
<template>
  <nav
    class="min-h-full max-h-full bg-white rounded-2xl p-4 w-[190px] shadow-xl z-50 overflow-hidden flex flex-col items-center"
  >
    <div class="flex-center mb-4 gap-2 w-full">
      <img src="@render/assets/images/logo.png" class="size-[60px]" />
      <span
        class="text-primary-color font-bold text-lg max-w-min text-center [word-spacing:100px]"
      >
        {{ $t('shared.app_name') }}
      </span>
    </div>

    <div class="flex flex-1 gap-2 flex-col overflow-x-visible overflow-y-auto">
      <Tree
        :expanded-keys="expandedItems"
        :pt="{
          content: {
            class: 'flex-row-reverse  overflow-hidden w-full'
          },
          label: {
            class: 'w-full max-w-full '
          },
          container: {
            class: 'flex flex-col gap-2    '
          }
        }"
        :value="navItems"
      >
        <template #default="{ node }">
          <div class="flex w-full">
            <span
              role="button"
              @click="toggleNodeExpand(node)"
              class="cursor-pointer flex items-center font-medium gap-1 w-full text-gray-600 hover:text-primary-color"
            >
              <component :is="node.customIcon" class="me-2 text-[25px]">
              </component>
              {{ node.label }}
            </span>
          </div>
        </template>

        <template #child="{ node }">
          <RouterLink class="w-full" :to="node.path">
            <span
              class="text-sm w-full flex items-center font-medium hover:text-primary-color cursor-pointer"
            >
              <component class="text-base me-2" :is="node.customIcon">
              </component>
              {{ node.label }}
            </span>
          </RouterLink>
        </template>
      </Tree>
    </div>

    <div class="flex-center gap-2 mb-1 mt-auto border-t py-1">
      <Avatar :label="'U'" shape="circle" class="size-[25px]" />
      <span> Ahmed Met </span>

      <Button text class="rounded-full p-1" severity="danger">
        <IcBaselineLogout class="ms-auto rtl:rotate-180" />
      </Button>
    </div>
  </nav>
</template>
