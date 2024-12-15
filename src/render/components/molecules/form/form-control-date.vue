<script setup lang="ts">
import { FormFieldProps } from "@render/types/form.types";
import { useField } from "vee-validate";
import FormControlWrapper from "./form-control-wrapper.vue";
const props = defineProps<FormFieldProps>();

const { value, errorMessage } = useField<Date>(() => props.name);
</script>
<template>
  <FormControlWrapper
    :errorMessage="errorMessage"
    :name="props.name"
    :label="props.label"
  >
    <template #input>
      <Calendar
        v-model="value"
        input-class="form-input"
        dateFormat="dd/mm/yy"
        :max-date="new Date()"
        :input-id="props.name"
        v-bind="props"
        :invalid="!!errorMessage"
        :aria-describedby="name + `-help`"
      />
    </template>
  </FormControlWrapper>
</template>
