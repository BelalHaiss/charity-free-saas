<script setup lang="ts">
defineProps<{ name: string; count: number }>();
</script>

<template>
  <p
    @click="
      () => {
        // eslint-disable-next-line vue/no-mutating-props
        // name = 'belal';
      }
    "
  >
    {{ name }}
  </p>
</template>

<style scoped></style>
