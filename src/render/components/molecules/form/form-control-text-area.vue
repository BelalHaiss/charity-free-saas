<script setup lang="ts">
import { useField } from "vee-validate";
import { FormFieldProps } from "@render/types/form.types";
import FormControlWrapper from "./form-control-wrapper.vue";
const props = defineProps<FormFieldProps>();
const { value, errorMessage, handleBlur } = useField<string>(() => props.name);
</script>
<template>
  <FormControlWrapper
    :errorMessage="errorMessage"
    :name="props.name"
    :label="props.label"
    :hide-label="props.hideLabel"
  >
    <template #input>
      <Textarea
        @blur="handleBlur"
        :id="props.name"
        v-model="value"
        :name="props.name"
        v-bind="props.inputProps"
        autoResize
        class="form-input"
        :invalid="!!errorMessage"
        :aria-describedby="props.name + `-help`"
      />
    </template>
  </FormControlWrapper>
</template>
