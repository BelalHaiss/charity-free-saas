<script setup lang="ts">
import { ButtonProps } from "primevue/button";
import MaterialSymbolsAddRounded from "~icons/material-symbols/add-rounded";
const props = defineProps<{ btnProps?: ButtonProps }>();
</script>

<template>
  <Button v-bind="props.btnProps">
    <MaterialSymbolsAddRounded />
  </Button>
</template>
