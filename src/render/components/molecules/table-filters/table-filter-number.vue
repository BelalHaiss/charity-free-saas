<script setup lang="ts">
import { FilterFieldInputProps } from "@render/types/table.types";
import { InputNumberProps } from "primevue/inputnumber";
const props = defineProps<FilterFieldInputProps<InputNumberProps>>();
const valueModel = defineModel<number>();
</script>
<template>
  <div>
    <InputNumber
      v-bind="props.inputProps"
      :id="props.name"
      v-model="valueModel"
      class="form-input"
      :use-grouping="false"
      :aria-describedby="props.name + `-help`"
    />
  </div>
</template>
