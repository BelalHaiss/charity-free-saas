<script setup lang="ts">
import { FormFieldProps } from "@render/types/form.types";
import { useField } from "vee-validate";
const { name, label } = defineProps<FormFieldProps>();
const { value, errorMessage } = useField<string>(() => name);
</script>
<template>
  <div>
    <label :for="name">{{ label }}</label>
    <InputNumber
      :id="name"
      v-model="value"
      class="form-input"
      :use-grouping="false"
      :invalid="!!errorMessage"
      :aria-describedby="name + `-help`"
    />
    <small
      v-if="errorMessage"
      :id="name + `-help`"
      class="text-red-500"
    >{{
      $t(errorMessage)
    }}</small>
  </div>
</template>
