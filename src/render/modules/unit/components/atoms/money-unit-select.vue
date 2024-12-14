<script setup lang="ts">
import { MoneyUnit } from "@prisma/client";
import { useGlobalState } from "@render/composables/use-global-state";
import { computed } from "vue";
import { getCodeLabel, getLabel } from "../../utils/money-unit-utils";

const { storage } = useGlobalState();
const unitsOptions = computed((): MoneyUnit[] => storage.value.moneyUnits);

const selectedUnit = defineModel<MoneyUnit>();
</script>

<template>
  <Dropdown
    v-model="selectedUnit"
    :options="unitsOptions"
    :optionLabel="getCodeLabel"
    class="flex-1 p-0 border-s-2 rounded-s-none max-h-[40px]"
  >
    <template #value="slotProps">
      <span v-if="slotProps.value" class="block w-full font-bold">{{
        getCodeLabel(slotProps.value)
      }}</span>
    </template>
    <template #option="slotProps">
      <div class="w-[300px]">
        <div>{{ getLabel(slotProps.option) }}</div>
      </div>
    </template>
  </Dropdown>
</template>
