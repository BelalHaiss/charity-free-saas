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
      dateFormat="dd/mm/yy"
      :max-date="new Date()"
      :input-id="props.name"
      :invalid="!!errorMessage"
      :aria-describedby="name + `-help`"
    />
  </div>
</template>
