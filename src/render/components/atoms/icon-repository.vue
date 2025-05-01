<script setup lang="ts">
import { IconName, icons } from "@render/utils/icon-map";

const props = defineProps<{ iconName: IconName }>();
</script>
<template>
  <component :is="icons[props.iconName]" />
</template>
