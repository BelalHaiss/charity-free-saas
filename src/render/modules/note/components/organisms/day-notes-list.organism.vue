<script setup lang="ts">
import CenteredSpinner from "@render/components/molecules/centered-spinner.vue";
import { NoteItemType } from "../../types/note.types";
import CreateNote from "../molecules/create-note.vue";
import NoteItem from "../molecules/note-item.vue";

defineProps<{
  notes: NoteItemType[];
  isLoading: boolean;
}>();
</script>
<template>
  <div class="flex flex-col gap-2">
    <CenteredSpinner v-if="isLoading" />
    <CreateNote />
    <NoteItem v-for="note in notes" :note="note" :key="note.id" />
  </div>
</template>
