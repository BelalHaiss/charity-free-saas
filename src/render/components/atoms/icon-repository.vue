<script setup lang="ts">
import IcRoundDeleteForever from "~icons/ic/round-delete-forever";
import MaterialSymbolsAddRounded from "~icons/material-symbols/add-rounded";
import TablerPencil from "~icons/tabler/pencil";
import MdiContentSavePlus from "~icons/mdi/content-save-plus";
import MaterialSymbolsUndoRounded from "~icons/material-symbols/undo-rounded";
import MaterialSymbolsLightStylusNote from "~icons/material-symbols-light/stylus-note";
import MaterialSymbolsPersonRounded from "~icons/material-symbols/person-rounded";
const props = defineProps<{ iconName: keyof typeof icons }>();

const icons = {
  "filled-delete": IcRoundDeleteForever,
  "add-circle-icon": MaterialSymbolsAddRounded,
  edit: TablerPencil,
  save: MdiContentSavePlus,
  undo: MaterialSymbolsUndoRounded,
  open_note_modal: MaterialSymbolsLightStylusNote,
  user: MaterialSymbolsPersonRounded,
};
</script>
<template>
  <component :is="icons[props.iconName]" />
</template>
