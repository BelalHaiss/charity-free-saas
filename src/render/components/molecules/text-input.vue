<script setup lang="ts">
type Props = {
  name: string;
  label: string;
  errorMessage?: string;
};
const { name, label, errorMessage } = defineProps<Props>();
const value = defineModel<string>();
</script>
<template>
  <div>
    <label :for="name">{{ label }}</label>
    <InputText
      :id="name"
      v-model="value"
      class="form-input"
      :invalid="!!errorMessage"
      :aria-describedby="name + `-help`"
    />
  </div>
</template>
