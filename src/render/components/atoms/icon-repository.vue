<script setup lang="ts">
import IcRoundDeleteForever from "~icons/ic/round-delete-forever";
const props = defineProps<{ iconName: keyof typeof icons }>();

const icons = {
  "filled-delete": IcRoundDeleteForever,
};
</script>
<template>
  <component :is="icons[props.iconName]" />
</template>
