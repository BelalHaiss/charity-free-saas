<script lang="ts" setup>
import { FormFieldProps } from '@render/types/form.types';

import { useField } from 'vee-validate';
import FormControlWrapper from './form-control-wrapper.vue';
import { DropdownProps } from 'primevue/dropdown';

const props = defineProps<FormFieldProps<DropdownProps>>();

const { value, errorMessage } = useField<number>(() => props.name, undefined);
</script>
<template>
  <FormControlWrapper
    :errorMessage="errorMessage"
    :name="props.name"
    :label="props.label"
  >
    <template #input>
      <Dropdown
        v-model="value"
        :options="props.inputProps.options"
        filter
        option-label="label"
        :placeholder="props.inputProps.placeholder"
        class="max-w-[300px] form-input"
        :pt="{
          filterContainer: {
            class: 'max-w-[300px] overflow-hidden'
          }
        }"
      >
      </Dropdown>
    </template>
  </FormControlWrapper>
</template>
