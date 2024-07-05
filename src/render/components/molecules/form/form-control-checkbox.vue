<script setup lang="ts">
import { FormFieldProps } from "@render/types/form.types";
import { CheckboxProps } from "primevue/checkbox";
import { useField } from "vee-validate";
const props = defineProps<FormFieldProps<CheckboxProps>>();

const { value, errorMessage } = useField<boolean>(() => props.name);
</script>
<template>
  <div class="!flex-row items-center gap-2">
    <label :for="props.name">{{ label }}</label>
    <Checkbox
      v-bind="props"
      v-model="value"
      :input-id="props.name"
      :invalid="!!errorMessage"
      :binary="true"
      :aria-describedby="name + `-help`"
    />
    <small
      v-if="errorMessage"
      :id="name + `-help`"
      class="text-red-500 block"
    >{{ $t(errorMessage) }}</small>
  </div>
</template>
