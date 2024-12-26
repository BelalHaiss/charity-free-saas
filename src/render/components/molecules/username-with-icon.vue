<script setup lang="ts">
import IconRepository from "../atoms/icon-repository.vue";

const props = defineProps<{ username: string }>();
</script>

<template>
  <div class="flex gap-1 items-center">
    <IconRepository icon-name="user" />
    <span>{{ props.username }}</span>
  </div>
</template>
