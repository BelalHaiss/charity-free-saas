<script setup lang="ts">
import { FormFieldProps } from "@render/types/form.types";
import { useField } from "vee-validate";
const props = defineProps<FormFieldProps>();

const { value, errorMessage } = useField<Date>(() => props.name);
</script>
<template>
  <div class="">
    <label :for="props.name">{{ label }}</label>
    <Calendar
      v-model="value"
      input-class="form-input"
      :input-id="props.name"
      :invalid="!!errorMessage"
      :aria-describedby="name + `-help`"
    />
    <small
      v-if="errorMessage"
      :id="name + `-help`"
      class="text-red-500 block"
    >{{ $t(errorMessage) }}</small>
  </div>
</template>
