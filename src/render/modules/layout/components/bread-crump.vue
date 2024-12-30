<script setup lang="ts">
import { MenuItem } from "primevue/menuitem";
import { RouteNamedMap } from "unplugin-vue-router/types";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

type Path = keyof RouteNamedMap;
const { t } = useI18n();

type PathProp = { path: Path; actualPath: string; customLabel?: string };
const props = defineProps<{
  paths: PathProp[];
}>();
const pathsWithLabel = new Map<Path, string>([
  ["/", "pages.home"],
  ["/beneficiaries/", "pages.beneficiaries"],
  ["/beneficiaries/create", "pages.add_beneficiary"],
  ["/beneficiaries/[id]/", ""],
  ["/benefits/finance", "pages.benefits_finance"],
  ["/benefits/items", "pages.benefits_items"],
  ["/profile/", "pages.profile"],
  ["/reports/daily", "pages.reports_daily"],
  ["/reports/donates", "pages.reports_donates"],
  ["/settings/info", "pages.settings_org"],
  ["/settings/units", "pages.settings_unit"],
  ["/settings/users/manage", "pages.settings_user"],
  ["/settings/users/roles", "pages.settings_user_roles"],
  ["/visits/", "pages.visits"],
  ["/visits/[id]/", ""],
  ["/visits/create", "pages.add_visit"],
]);

const activePaths = computed<(MenuItem & PathProp)[]>(() =>
  props.paths.map((item) => ({
    label: item.customLabel ?? pathsWithLabel.get(item.path),
    ...item,
  })),
);
</script>
<template>
  <div>
    <Breadcrumb :model="activePaths">
      <template #item="{ item }">
        <RouterLink class="" :to="item.actualPath">
          {{ t(item.label as string) }}
        </RouterLink>
      </template>
    </Breadcrumb>
  </div>
</template>
