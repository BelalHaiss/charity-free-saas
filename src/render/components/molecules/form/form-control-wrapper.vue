<script setup lang="ts">
const props = defineProps<{
  name: string;
  label: string;
  hideLabel?: boolean;
  errorMessage?: string;
}>();
</script>

<template>
  <div class="flex flex-col w-full">
    <label v-if="!hideLabel" :for="props.name">{{ props.label }}</label>

    <slot name="input" />

    <span class="text-red-500 text-xs h-2 my-[2px]">
      {{ errorMessage }}
    </span>
  </div>
</template>
