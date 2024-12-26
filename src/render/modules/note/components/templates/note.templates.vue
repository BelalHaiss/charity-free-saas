<script setup lang="ts">
import IconRepository from "@render/components/atoms/icon-repository.vue";
import { useDisclosure } from "@render/composables/use-disclosure";
import { QUERY_KEYS } from "@render/composables/use-query-typed";
import { useTypedI18n } from "@render/composables/use-typed-i18n";
import { useQuery } from "@tanstack/vue-query";
import { noteRepository } from "../../repository/note.repository";
import DayNotesListOrganism from "../organisms/day-notes-list.organism.vue";

const { isOpen, onClose, onOpen } = useDisclosure();
const { t } = useTypedI18n();

const { data: publicNotes, isLoading: publicNotesLoading } = useQuery({
  queryKey: QUERY_KEYS.PUBLIC_NOTES,
  queryFn: noteRepository.getPublicNotes,
  initialData: [],
});

const { data: privateNotes, isLoading: privateNotesLoading } = useQuery({
  queryKey: QUERY_KEYS.USER_NOTES,
  queryFn: noteRepository.getUserNotes,
  initialData: [],
});
</script>
<template>
  <Button severity="secondary" rounded @click="onOpen">
    <IconRepository icon-name="open_note_modal" />
  </Button>

  <Dialog
    v-model:visible="isOpen"
    modal
    :header="t('notes')"
    :style="{ width: '25rem' }"
  >
    <TabView>
      <TabPanel :header="t('public_notes')">
        <DayNotesListOrganism
          :notes="publicNotes"
          :is-loading="publicNotesLoading"
        />
      </TabPanel>
      <TabPanel :header="t('my_notes')">
        <DayNotesListOrganism
          :notes="privateNotes"
          :is-loading="privateNotesLoading"
        />
      </TabPanel>
    </TabView>
    <div class="flex justify-content-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="onClose"
      ></Button>
    </div>
  </Dialog>
</template>
