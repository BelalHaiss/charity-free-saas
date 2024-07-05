<script setup lang="ts">
import {
  FilterFieldInputProps,
  FilterFieldType,
} from "@render/types/table.types";
import { type Component } from "vue";
import TableFilterText from "./table-filter-text.vue";
import TableFilterNumber from "./table-filter-number.vue";

const props = defineProps<FilterFieldInputProps<object>>();
const valueModel = defineModel<string | number>();

const activeComponent: Partial<Record<FilterFieldType, Component>> = {
  text: TableFilterText,
  number: TableFilterNumber,
};
</script>
<template>
  <component
    v-bind="props"
    :is="activeComponent[props.type]"
    v-model="valueModel"
  />
</template>
