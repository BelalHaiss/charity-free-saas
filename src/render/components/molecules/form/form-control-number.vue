<script setup lang="ts">
import { FormFieldProps } from '@render/types/form.types';
import { useField } from 'vee-validate';
const { name, label } = defineProps<FormFieldProps>();
const { value, errorMessage } = useField<string>(() => name);
</script>
<template>
  <div>
    <label :for="name">{{ label }}</label>
    <InputNumber
      class="form-input"
      :useGrouping="false"
      :id="name"
      :invalid="!!errorMessage"
      v-model="value"
      :aria-describedby="name + `-help`"
    />
    <small class="text-red-500" v-if="errorMessage" :id="name + `-help`">{{
      $t(errorMessage)
    }}</small>
  </div>
</template>
