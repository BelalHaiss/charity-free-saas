<script setup lang="ts">
import { Unit } from "@prisma/client";
import { computed } from "vue";

const props = defineProps<{
  qty: number; // in small/sm_unit
  unit: Unit;
}>();

const displayQuantity = computed(() => {
  const factor = props.unit.sm_to_bg_factor;
  const decimal = props.qty / factor;
  const isInteger = Number.isInteger(decimal);

  return isInteger
    ? `${decimal} ${props.unit.bg_unit_label}`
    : `${decimal.toFixed(2)} ${props.unit.bg_unit_label}`;
});
</script>

<template>
  <span>{{ `${displayQuantity} ${unit.bg_unit_abbr}` }}</span>
</template>
