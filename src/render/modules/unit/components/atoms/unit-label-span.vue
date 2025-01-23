<script setup lang="ts">
import { useGlobalState } from "@render/composables/use-global-state";

const props = defineProps<{ unitId: number }>();
const { getters } = useGlobalState();
const unit = getters.getUnitById(props.unitId)!;
</script>

<template>
  <span>{{ unit.label }}</span>
</template>
