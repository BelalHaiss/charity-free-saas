<script setup generic="T extends FormFieldType" lang="ts">
import {
  FormField,
  FormFieldType,
  FormFieldValueTypeMap
} from '@render/types/form.types';
import { useField } from 'vee-validate';
const props = defineProps<Omit<FormField<string>, 'type'> & { type: T }>();

const { value, errorMessage } = useField<FormFieldValueTypeMap[T]>(props.name);
</script>
<template>
  <label v-if="!hideLabel" :for="props.name">{{ props.label }}</label>

  <slot name="input" :value="value" :invalid="!!errorMessage" />

  <span class="text-red-500 text-xs h-2 my-[2px]">
    {{ errorMessage }}
  </span>
</template>
