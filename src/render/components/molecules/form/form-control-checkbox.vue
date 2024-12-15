<script setup lang="ts">
import { FormFieldProps } from "@render/types/form.types";
import { CheckboxProps } from "primevue/checkbox";
import { useField } from "vee-validate";
import FormControlWrapper from "./form-control-wrapper.vue";
const props = defineProps<FormFieldProps<CheckboxProps>>();

const { value, errorMessage } = useField<boolean>(() => props.name);
</script>
<template>
  <FormControlWrapper
    :errorMessage="errorMessage"
    :name="props.name"
    hideLabel
    :label="props.label"
  >
    <template #input>
      <Checkbox
        v-bind="props"
        v-model="value"
        :input-id="props.name"
        :invalid="!!errorMessage"
        :binary="true"
        :aria-describedby="name + `-help`"
      />
    </template>
  </FormControlWrapper>
</template>
