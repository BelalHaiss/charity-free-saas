<script setup lang="ts">
defineProps<{ isFullScreen?: boolean }>();
</script>

<template>
  <div
    :class="`flex-center ${isFullScreen ? ' w-dvw h-dvh' : 'w-full h-full'}  `"
  >
    <ProgressSpinner />
  </div>
</template>
