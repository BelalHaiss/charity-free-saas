<script setup lang="ts">
import { FormField, FormFieldType } from '@render/types/form.types';
import { type Component } from 'vue';
import FormControlText from './form-control-text.vue';
import FormControlMultiSelectCreatable from './form-control-multi-select-creatable.vue';
import FormControlDate from './form-control-date.vue';
import FormControlNumber from './form-control-number.vue';
import FormControlPassword from './form-control-password.vue';
import FormControlCheckbox from './form-control-checkbox.vue';
const props = defineProps<FormField<any>>();

const activeComponent: Record<FormFieldType, Component> = {
  date: FormControlDate,
  'multi-select-creatable': FormControlMultiSelectCreatable,
  text: FormControlText,
  number: FormControlNumber,
  password: FormControlPassword,
  checkbox: FormControlCheckbox
};
</script>
<template>
  <component
    class="flex gap-1 flex-col w-[250px] sm:w-[300px] [&>label]:capitalize"
    v-bind="props"
    :is="activeComponent[props.type]"
  />
</template>
