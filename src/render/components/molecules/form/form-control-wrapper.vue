<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps<{
  name: string;
  label: string;
  hideLabel?: boolean;
}>();

const { errorMessage } = useField<string>(() => props.name);
</script>

<template>
  <div class="flex flex-col">
    <label v-if="!hideLabel" :for="props.name">{{ props.label }}</label>

    <slot name="input" />

    <InlineMessage v-if="!!errorMessage">
      {{ errorMessage }}
    </InlineMessage>
  </div>
</template>
