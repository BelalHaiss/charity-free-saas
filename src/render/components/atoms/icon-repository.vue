<script setup lang="ts">
import IcRoundDeleteForever from "~icons/ic/round-delete-forever";
import MaterialSymbolsAddRounded from "~icons/material-symbols/add-rounded";

const props = defineProps<{ iconName: keyof typeof icons }>();

const icons = {
  "filled-delete": IcRoundDeleteForever,
  "add-circle-icon": MaterialSymbolsAddRounded,
};
</script>
<template>
  <component :is="icons[props.iconName]" />
</template>
