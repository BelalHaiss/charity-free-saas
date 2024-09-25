<script setup lang="ts">
import SmContainer from "@render/components/organisms/sm-container.vue";
import ViewItemWithUnit from "@render/modules/item/components/organisms/view-item-with-unit.vue";
import { TableHeader } from "@render/types/util.types";
import { DonateWithRelations } from "@shared/types/donates/donates.dto";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const { items } = defineProps<{ items: DonateWithRelations["donate_items"] }>();
const tableHeader = computed((): TableHeader[] => [
  {
    label: t("shared.item"),
    styles: { flex: 2 },
  },
  {
    label: t("shared.unit"),
    styles: { flex: 1 },
  },
  {
    label: t("shared.value"),
    styles: { flex: 1 },
  },
]);
</script>
<template>
  <SmContainer class="min-w-full">
    <template #header>
      {{ t("shared.monetary-donation") }}
    </template>

    <template #main>
      <div class="flex flex-col p-2 items-center gap-2 [&>div]:w-full">
        <div class="flex items-center w-full gap-2">
          <span
            v-for="head in tableHeader"
            :key="head.label"
            class="bg-gray-200 text-black rounded-md text-center"
            :style="head.styles"
          >
            {{ head.label }}
          </span>
        </div>

        <div
          class="flex gap-2 font-semibold"
          v-for="item in items"
          :key="item.id"
        >
          <ViewItemWithUnit
            class="w-full flex-[3] flex"
            :unit-size="item.user_unit_size"
            :item-id="item.item_id"
          />
          <span class="text-center flex-1">{{ item.unit_value }}</span>
        </div>
      </div>
    </template>
  </SmContainer>
</template>
