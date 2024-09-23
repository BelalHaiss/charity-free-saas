<script setup lang="ts">
import { FormFieldProps } from "@render/types/form.types";
import { InputTextProps } from "primevue/inputtext";

export type MyInputTextProps = Omit<FormFieldProps<InputTextProps>, "type"> & {
  errorMessage?: string;
};

const props = defineProps<MyInputTextProps>();
const value = defineModel<string>();
</script>
<template>
  <div>
    <label :for="props.name">{{ props.label }}</label>
    <InputText
      :id="props.name"
      v-model="value"
      v-bind="props.inputProps"
      class="form-input"
      :invalid="!!props.errorMessage"
      :aria-describedby="props.name + `-help`"
    />
  </div>
</template>
