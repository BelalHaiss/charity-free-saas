<script setup lang="ts">
import Button, { ButtonProps } from "primevue/button";

defineProps<{ buttonProps?: ButtonProps }>();
</script>
<template>
  <Button :class="`py-1 px-2 rounded-md `" v-bind="buttonProps" text>
    <slot></slot>
  </Button>
</template>
