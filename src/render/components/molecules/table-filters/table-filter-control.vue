<script setup lang="ts">
import {
  FilterFieldInputProps,
  FilterFieldType
} from '@render/types/table.types';
import { type Component } from 'vue';
import TableFilterText from './table-filter-text.vue';
import TableFilterNumber from './table-filter-number.vue';

const props = defineProps<FilterFieldInputProps<any>>();
const valueModel = defineModel<string | number>();

const activeComponent: Partial<Record<FilterFieldType, Component>> = {
  text: TableFilterText,
  number: TableFilterNumber
};
</script>
<template>
  <component
    v-bind="props"
    v-model="valueModel"
    :is="activeComponent[props.type]"
  />
</template>
