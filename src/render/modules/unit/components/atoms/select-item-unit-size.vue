<script setup lang="ts">
import { Unit, UNIT_SIZE } from "@prisma/client";
import { useGlobalState } from "@render/composables/use-global-state";
import { computed, ref, watch } from "vue";

const props = defineProps<{ unitId?: number }>();
const { getters } = useGlobalState();
type UnitSizeOptions = { label: string; value: UNIT_SIZE; abbr: string };
const selectedUnitSize = ref<UNIT_SIZE>();

const selectedUnit = ref<Unit>();
const unitSizeOptions = ref<UnitSizeOptions[]>();

watch(
  () => props.unitId,
  () => {
    if (!props.unitId) return;
    const unit = getters.getUnitById(props.unitId)!;
    selectedUnit.value = unit;
    selectedUnitSize.value = "LG";
    unitSizeOptions.value = [
      {
        label: selectedUnit.value.bg_unit_label,
        abbr: selectedUnit.value.bg_unit_abbr,
        value: "LG",
      },
      {
        label: selectedUnit.value.sm_unit_label,
        abbr: selectedUnit.value.sm_unit_abbr,
        value: "SM",
      },
    ];
  },
);

const emit = defineEmits<{ (e: "setUnitSize", unit: UNIT_SIZE): void }>();

watch(selectedUnitSize, (newVal) => newVal && emit("setUnitSize", newVal));

const getUnitAbbr = (size: UNIT_SIZE) =>
  !selectedUnit.value
    ? ""
    : selectedUnit.value[size === "SM" ? "sm_unit_abbr" : "bg_unit_abbr"];
</script>

<template>
  <Dropdown
    v-model="selectedUnitSize"
    :disabled="!unitId"
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
