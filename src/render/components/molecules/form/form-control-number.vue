<script setup lang="ts">
import { FormFieldProps } from "@render/types/form.types";
import { useField } from "vee-validate";
import FormControlWrapper from "./form-control-wrapper.vue";
const props = defineProps<FormFieldProps>();
const { value, errorMessage } = useField<number>(() => props.name);
</script>
<template>
  <FormControlWrapper
    :errorMessage="errorMessage"
    :name="props.name"
    :label="props.label"
  >
    <template #input>
      <InputNumber
        :id="name"
        v-model="value"
        class="form-input"
        :use-grouping="false"
        :invalid="!!errorMessage"
        :aria-describedby="name + `-help`"
      />
    </template>
  </FormControlWrapper>
</template>
