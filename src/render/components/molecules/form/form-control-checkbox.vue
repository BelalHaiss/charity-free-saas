<script setup lang="ts">
import { FormFieldProps } from '@render/types/form.types';
import { CheckboxProps } from 'primevue/checkbox';
import { useField } from 'vee-validate';
const props = defineProps<FormFieldProps<CheckboxProps>>();

const { value, errorMessage } = useField<boolean>(() => props.name);
</script>
<template>
  <div class="!flex-row items-center gap-2">
    <label :for="props.name">{{ label }}</label>
    <Checkbox
      :input-id="props.name"
      v-bind="props"
      :invalid="!!errorMessage"
      :binary="true"
      v-model="value"
      :aria-describedby="name + `-help`"
    />
    <small
      class="text-red-500 block"
      v-if="errorMessage"
      :id="name + `-help`"
      >{{ $t(errorMessage) }}</small
    >
  </div>
</template>
