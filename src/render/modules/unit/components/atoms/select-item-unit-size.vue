<script setup lang="ts">
import { useGlobalState } from "@render/composables/use-global-state";
import { computed, ref, watch } from "vue";
import { UnitCategoryOptions, UnitWithSize } from "../../types/unit.type";

const selectedUnit = ref<UnitWithSize>();

const { getters } = useGlobalState();

const unitsOptions = computed<UnitCategoryOptions[]>(() =>
  getters.getGroupedUnits().map(
    (group): UnitCategoryOptions => ({
      category: group.category,
      units: group.units.map((unit) => ({
        unitLabel: unit.label,
        sizes: [
          {
            abbr: unit.bg_unit_abbr,
            id: unit.id,
            label: unit.bg_unit_label,
            size: "LG",
          },
          {
            abbr: unit.sm_unit_abbr,
            id: unit.id,
            label: unit.sm_unit_label,
            size: "SM",
          },
        ],
      })),
    }),
  ),
);

const emit = defineEmits<{ (e: "setUnitSize", unit: UnitWithSize): void }>();

watch(selectedUnit, (newVal) => newVal && emit("setUnitSize", newVal));
</script>

<template>
  <div class="card flex justify-content-center">
    <CascadeSelect
      class="w-full"
      v-model="selectedUnit"
      :options="unitsOptions"
      optionLabel="label"
      optionGroupLabel="name"
      :optionGroupChildren="['units', 'sizes']"
    />
  </div>
</template>
