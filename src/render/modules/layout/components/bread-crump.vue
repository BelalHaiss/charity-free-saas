<script setup lang="ts">
import { MenuItem } from 'primevue/menuitem';
import { RouteNamedMap } from 'unplugin-vue-router/types';
import { computed } from 'vue';

type Path = keyof RouteNamedMap;

type PathProp = { path: Path; actualPath: string; customLabel?: string };
const props = defineProps<{
  paths: PathProp[];
}>();
const pathsWithLabel = new Map<Path, string>([
  ['/', 'shared.pages.home'],
  ['/beneficiaries/', 'shared.pages.beneficiaries'],
  ['/beneficiaries/create', 'shared.pages.add_beneficiary'],
  ['/beneficiaries/[id]/', ''],
  ['/benefits/finance', 'shared.pages.benefits_finance'],
  ['/benefits/items', 'shared.pages.benefits_items'],
  ['/profile/', 'shared.pages.profile'],
  ['/reports/daily', 'shared.pages.reports_daily'],
  ['/reports/donates', 'shared.pages.reports_donates'],
  ['/settings/info', 'shared.pages.settings_org'],
  ['/settings/units', 'shared.pages.settings_unit'],
  ['/settings/users/manage', 'shared.pages.settings_user'],
  ['/settings/users/roles', 'shared.pages.settings_user_roles'],
  ['/visits/', 'shared.pages.visits'],
  ['/visits/[id]/', ''],
  ['/visits/create', 'shared.pages.add_visit']
]);

const activePaths = computed<(MenuItem & PathProp)[]>(() =>
  props.paths.map((item) => ({
    label: item.customLabel ?? pathsWithLabel.get(item.path),
    ...item
  }))
);
</script>
<template>
  <div>
    <Breadcrumb :model="activePaths">
      <template #item="{ item, props }">
        <RouterLink class="" :to="item.actualPath">
          {{ $t(item.label as string) }}
        </RouterLink>
      </template>
    </Breadcrumb>
  </div>
</template>
