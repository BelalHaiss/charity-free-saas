<script setup lang="ts">
import { FormFieldProps } from "@render/types/form.types";
import { useField } from "vee-validate";
import FormControlWrapper from "./form-control-wrapper.vue";
const props = defineProps<FormFieldProps>();
const { value, errorMessage } = useField<string>(() => props.name);
</script>
<template>
  <FormControlWrapper
    :errorMessage="errorMessage"
    :name="props.name"
    :label="props.label"
  >
    <template #input>
      <Password
        :id="name"
        v-bind="props.inputProps"
        v-model="value"
        input-class="form-input"
        :invalid="!!errorMessage"
        :aria-describedby="name + `-help`"
        :feedback="false"
        toggle-mask
      />
    </template>
  </FormControlWrapper>
</template>
