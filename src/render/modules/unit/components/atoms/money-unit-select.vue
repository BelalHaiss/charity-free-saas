<script setup lang="ts">
import { MoneyUnit } from '@prisma/client';
import { getCodeLabel, getLabel } from '../../utils/money-unit-utils';
import { QUERY_KEYS } from '@render/composables/use-query-typed';
import { moneyUnitRepository } from '../../repository/money-unit.repository';
import { useQuery } from '@tanstack/vue-query';

const { data: unitsOptions, isLoading } = useQuery({
  queryKey: QUERY_KEYS.MONEY_UNITS,
  queryFn: () => moneyUnitRepository.getAllUnits(),
  initialData: []
});

const selectedUnit = defineModel<MoneyUnit>();
</script>

<template>
  <Dropdown
    v-model="selectedUnit"
    :options="unitsOptions"
    :optionLabel="getCodeLabel"
    class="flex-1 p-0 border-s-2 rounded-s-none max-h-[45px]"
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
