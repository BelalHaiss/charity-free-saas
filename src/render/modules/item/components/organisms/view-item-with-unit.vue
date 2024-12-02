<script setup lang="ts">
import { QUERY_KEYS } from "@render/composables/use-query-typed";
import { itemRepository } from "../../repository/item.repository";
import ItemDeleted from "@render/components/atoms/item-deleted.vue";
import { computed, watch } from "vue";
import { useGlobalState } from "@render/composables/use-global-state";
import { UNIT_SIZE } from "@prisma/client";
import { useQuery } from "@tanstack/vue-query";

const { itemId, unitSize } = defineProps<{
  itemId: number;
  unitSize: UNIT_SIZE;
}>();

const { getters } = useGlobalState();
const { data, error, isLoading } = useQuery({
  queryKey: QUERY_KEYS.ITEM_ID(itemId),
  queryFn: () => itemRepository.getItemById(itemId),
});

watch(data, () => {
  console.log({ data });
});

const donateItemUnit = computed(() => {
  if (!data || !data.value) return "";
  const unit = getters.getUnitById(data.value.unit_id)!;
  return unitSize === "LG" ? unit.bg_unit_abbr : unit.sm_unit_abbr;
});
</script>
<template>
  <div>
    <!-- loading  -->
    <Skeleton v-if="isLoading" class="flex-[3]" />
    <!-- item deleted  -->
    <ItemDeleted v-if="!isLoading && data === null" class="flex-[3]" />
    <div class="font-semibold w-full *:text-center flex" v-if="data">
      <span class="flex-[2]">
        {{ data.name }}
      </span>

      <span class="flex-[1]">
        {{ donateItemUnit }}
      </span>
    </div>
  </div>
</template>
