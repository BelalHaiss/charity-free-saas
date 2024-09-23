<script setup lang="ts">
import { useField } from "vee-validate";
import TextInput, { MyInputTextProps } from "../text-input.vue";
const props = defineProps<MyInputTextProps>();
const { value, errorMessage } = useField<string>(() => props.name);
</script>
<template>
  <TextInput
    v-model="value"
    :input-props="props.inputProps"
    :label="props.label"
    :name="props.name"
    :error-message="errorMessage"
  />
</template>
