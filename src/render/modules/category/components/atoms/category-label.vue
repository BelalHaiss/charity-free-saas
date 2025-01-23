<script setup lang="ts">
import { useGlobalState } from "@render/composables/use-global-state";

defineProps<{ categoryId: string }>();
useGlobalState();
</script>
<template>
  <div></div>
</template>
