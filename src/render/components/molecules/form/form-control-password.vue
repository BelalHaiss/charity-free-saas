<script setup lang="ts">
import { FormFieldProps } from "@render/types/form.types";
import { useField } from "vee-validate";
const { name, label } = defineProps<FormFieldProps>();
const { value, errorMessage } = useField<string>(() => name);
</script>
<template>
  <Password
    :id="name"
    v-model="value"
    input-class="form-input"
    :invalid="!!errorMessage"
    :aria-describedby="name + `-help`"
    :feedback="false"
    toggle-mask
  />
</template>
