<script setup lang="ts">
import { MutableTableRow } from "@render/types/table.types";
import { ItemIncludeCategoryAndBenefit } from "@shared/types/benefit/benefit.dto";
import { useItemRow } from "../../view-model/item-row.view-model";
import ViewItemRow from "../molecules/view-item-row.vue";
import { deepToRaw } from "@render/utils/vue.util";

const props = defineProps<{
  item: MutableTableRow<ItemIncludeCategoryAndBenefit>;
}>();
const rawItem = deepToRaw(props.item);
const { mode } = useItemRow(rawItem);
</script>
<template>
  <tr class="*:text-center">
    <ViewItemRow v-if="mode === 'VIEW'" />
    <!-- write component -->
  </tr>
</template>
