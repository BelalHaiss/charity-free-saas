<script setup lang="ts">
import { FormField, FormFieldType } from "@render/types/form.types";
import { type Component } from "vue";
import FormControlText from "./form-control-text.vue";
import FormControlMultiSelectCreatable from "./form-control-multi-select-creatable.vue";
import FormControlDate from "./form-control-date.vue";
import FormControlNumber from "./form-control-number.vue";
import FormControlPassword from "./form-control-password.vue";
import FormControlCheckbox from "./form-control-checkbox.vue";
import { useField } from "vee-validate";

const props = defineProps<FormField<string>>();

const activeComponent: Record<FormFieldType, Component> = {
  date: FormControlDate,
  "multi-select-creatable": FormControlMultiSelectCreatable,
  text: FormControlText,
  number: FormControlNumber,
  password: FormControlPassword,
  checkbox: FormControlCheckbox,
};
const { errorMessage } = useField<string>(() => props.name);
</script>

<template>
  <div class="flex flex-col">
    <label :for="props.name">{{ props.label }}</label>
    <component
      v-bind="props"
      :is="activeComponent[props.type]"
      class="flex gap-1 flex-col w-[250px] sm:w-[300px] [&>label]:capitalize"
    />
    <InlineMessage v-if="!!errorMessage">
      {{ errorMessage }}
    </InlineMessage>
  </div>
</template>
