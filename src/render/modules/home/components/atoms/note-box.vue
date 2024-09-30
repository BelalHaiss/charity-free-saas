<script setup lang="ts">
import { Note } from "@prisma/client";
import Button from "primevue/button";
import { useI18n } from "vue-i18n";
import MaterialSymbolsLightStylusNote from "~icons/material-symbols-light/stylus-note";
type Props = {
  notes: Note[];
  onClick(): void;
};

const { notes } = defineProps<Props>();

const { t } = useI18n();
</script>
<template>
  <div
    class="size-[120px] text-white bg-yellow-500 shadow-xl rounded-lg flex-center justify-between p-2 flex-col gap-4"
  >
    <span class="font-bold"> {{ t("shared.notes") }}</span>

    <span class="font-bold text-lg"> {{ notes.length }}</span>

    <Button severity="secondary" rounded @click="onClick">
      <MaterialSymbolsLightStylusNote />
    </Button>
  </div>
</template>
