<script setup lang="ts">
import IcRoundDeleteForever from "~icons/ic/round-delete-forever";
import MaterialSymbolsAddRounded from "~icons/material-symbols/add-rounded";
import TablerPencil from "~icons/tabler/pencil";
import MdiContentSavePlus from "~icons/mdi/content-save-plus";
import MaterialSymbolsUndoRounded from "~icons/material-symbols/undo-rounded";
const props = defineProps<{ iconName: keyof typeof icons }>();

const icons = {
  "filled-delete": IcRoundDeleteForever,
  "add-circle-icon": MaterialSymbolsAddRounded,
  edit: TablerPencil,
  save: MdiContentSavePlus,
  undo: MaterialSymbolsUndoRounded,
};
</script>
<template>
  <component :is="icons[props.iconName]" />
</template>
