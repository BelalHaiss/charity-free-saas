import { FunctionalComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import MaterialSymbolsLightViewComfyAltOutlineRounded from '~icons/material-symbols-light/view-comfy-alt-outline-rounded';
import MdiPackageVariantClosedCheck from '~icons/mdi/package-variant-closed-check';
import IconoirPeopleTag from '~icons/iconoir/people-tag';
import StreamlineWarehouse1 from '~icons/streamline/warehouse-1';
import SolarSettingsOutline from '~icons/solar/settings-outline';
import TablerReportMoney from '~icons/tabler/report-money';
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
import { TreeNode } from 'primevue/treenode';

export const useSideNav = () => {
  const { t } = useI18n();

  const navItems = computed<(TreeNode & { customIcon: FunctionalComponent })[]>(
    () => [
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
        children: [
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
    ]
  );

  return { navItems };
};
