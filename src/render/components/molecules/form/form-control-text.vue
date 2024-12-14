<script setup lang="ts">
import { useField } from "vee-validate";
import { FormFieldProps } from "@render/types/form.types";
const props = defineProps<FormFieldProps>();
const { value, errorMessage } = useField<string>(() => props.name);
</script>
<template>
  <InputText
    :id="props.name"
    v-model="value"
    :name="props.name"
    v-bind="props.inputProps"
    class="form-input"
    :invalid="!!errorMessage"
    :aria-describedby="props.name + `-help`"
  />
</template>
