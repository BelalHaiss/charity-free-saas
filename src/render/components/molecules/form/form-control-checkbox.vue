<script setup lang="ts">
import { FormFieldProps } from "@render/types/form.types";
import { CheckboxProps } from "primevue/checkbox";
import { useField } from "vee-validate";
const props = defineProps<FormFieldProps<CheckboxProps>>();

const { value, errorMessage } = useField<boolean>(() => props.name);
</script>
<template>
  <Checkbox
    v-bind="props"
    v-model="value"
    :input-id="props.name"
    :invalid="!!errorMessage"
    :binary="true"
    :aria-describedby="name + `-help`"
  />
</template>
