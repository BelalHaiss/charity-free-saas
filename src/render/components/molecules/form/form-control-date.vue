<script setup lang="ts">
import { FormFieldProps } from '@render/types/form.types';
import { useField } from 'vee-validate';
const props = defineProps<FormFieldProps>();

const { value, errorMessage } = useField<Date>(() => props.name);
</script>
<template>
  <div class="">
    <label :for="props.name">{{ label }}</label>
    <Calendar
      inputClass="form-input"
      :input-id="props.name"
      :invalid="!!errorMessage"
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
