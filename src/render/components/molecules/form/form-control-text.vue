<script setup lang="ts">
import { FormFieldProps } from "@render/types/form.types";
import { useField } from "vee-validate";
import TextInput from "../text-input.vue";
const { name, label } = defineProps<FormFieldProps>();
const { value } = useField<string>(() => name);
</script>
<template>
  <TextInput v-model="value" :name="name" :label="label" />
</template>
