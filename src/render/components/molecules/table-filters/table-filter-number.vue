<script setup lang="ts">
import { FilterFieldInputProps } from '@render/types/table.types';
import { InputNumberProps } from 'primevue/inputnumber';
const props = defineProps<FilterFieldInputProps<InputNumberProps>>();
const valueModel = defineModel<number>();
</script>
<template>
  <div>
    <InputNumber
      class="form-input"
      :useGrouping="false"
      v-bind="props.inputProps"
      v-model="valueModel"
      :id="props.name"
      :aria-describedby="props.name + `-help`"
    />
  </div>
</template>
