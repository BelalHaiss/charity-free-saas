<script setup lang="ts">
import { FilterFieldInputProps } from '@render/types/table.types';
import { InputTextProps } from 'primevue/inputtext';
const props = defineProps<FilterFieldInputProps<InputTextProps>>();
const valueModel = defineModel<string>();
</script>
<template>
  <div>
    <InputText
      :id="props.name"
      class="form-input"
      v-model="valueModel"
      v-bind="props.inputProps"
      :aria-describedby="props.name + `-help`"
    />
  </div>
</template>
