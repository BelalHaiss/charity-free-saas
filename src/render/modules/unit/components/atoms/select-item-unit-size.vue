<script setup lang="ts">
import { Unit, UNIT_SIZE } from '@prisma/client';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';
import { unitRepository } from '../../repository/unit.repository';
import { QUERY_KEYS } from '@render/composables/use-query-typed';

const props = defineProps<{ unitId?: number }>();
type UnitSizeOptions = { label: string; value: UNIT_SIZE; abbr: string };
const selectedUnitSize = ref<UNIT_SIZE>();

const selectedUnit = ref<Unit>();
const unitSizeOptions = ref<UnitSizeOptions[]>();

const { data: units, isLoading } = useQuery({
  queryKey: QUERY_KEYS.UNITS,
  queryFn: () => unitRepository.getAllUnits(),
  initialData: []
});

watch(
  () => props.unitId,
  () => {
    if (!props.unitId) return;
    const unit = units.value.find((unit) => unit.id === props.unitId)!;
    selectedUnit.value = unit;
    selectedUnitSize.value = 'LG';
    unitSizeOptions.value = [
      {
        label: selectedUnit.value.bg_unit_label,
        abbr: selectedUnit.value.bg_unit_abbr,
        value: 'LG'
      },
      {
        label: selectedUnit.value.sm_unit_label,
        abbr: selectedUnit.value.sm_unit_abbr,
        value: 'SM'
      }
    ];
  }
);

const emit = defineEmits<{ (e: 'setUnitSize', unit: UNIT_SIZE): void }>();

watch(selectedUnitSize, (newVal) => newVal && emit('setUnitSize', newVal));

const getUnitAbbr = (size: UNIT_SIZE) =>
  !selectedUnit.value
    ? ''
    : selectedUnit.value[size === 'SM' ? 'sm_unit_abbr' : 'bg_unit_abbr'];
</script>

<template>
  <Dropdown
    v-model="selectedUnitSize"
    :disabled="!unitId || isLoading"
    :options="unitSizeOptions"
    optionValue="value"
    optionLabel="label"
    class="flex-1 p-0 border-s-2 rounded-s-none"
  >
    <template #value="slotProps">
      <span v-if="slotProps.value" class="block w-full font-bold">{{
        getUnitAbbr(slotProps.value)
      }}</span>
    </template>
    <template #option="slotProps">
      <div class="w-[60px]">
        <div>{{ slotProps.option.label }}</div>
      </div>
    </template>
  </Dropdown>
</template>
