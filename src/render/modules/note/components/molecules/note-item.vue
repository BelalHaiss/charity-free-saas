<script setup lang="ts">
import { ref, computed } from "vue";
import IconRepository from "@render/components/atoms/icon-repository.vue";
import { Note } from "@prisma/client";
import { formatDate } from "@render/utils/date.util";
import { noteColors } from "../../service/note.util";
import { useForm } from "vee-validate";
import { updateNoteSchema } from "@shared/services/schema/note.schema";
import { toTypedSchema } from "@vee-validate/zod";
import { useI18n } from "vue-i18n";
import { Locale } from "@shared/types/util.types";
import { UpdateNotePayload } from "@shared/types/note/note.dto";
import { useQueryHelper } from "@render/composables/use-query-typed";
import { useToast } from "@render/composables/use-toast";
import { noteRepository } from "../../repository/note.repository";
import Button from "primevue/button";

interface NoteProps {
  note: Note;
}

const { locale } = useI18n<object, Locale>();
const props = defineProps<NoteProps>();

const { resetForm, defineField, meta, values } = useForm<UpdateNotePayload>({
  validationSchema: toTypedSchema(updateNoteSchema(locale.value)),
  initialValues: {
    content: props.note.content,
  },
});

const { invalidateQueries } = useQueryHelper();
const [content, contentAttr] = defineField("content");
const { failedToast, successToast } = useToast();
const isSubmitting = ref(false);
const isDeleting = ref(false);
const saveEditedNote = async () => {
  isSubmitting.value = true;
  const payload = values;
  try {
    await noteRepository.editNote(props.note.id, payload);
    successToast();
    await invalidateQueries(["notes"]);
    resetForm();
  } catch (e) {
    failedToast(e);
  } finally {
    isSubmitting.value = false;
  }
};

const handleDelete = async () => {
  isDeleting.value = true;
  try {
    await noteRepository.deleteNote(props.note.id);
    successToast();
    await invalidateQueries(["notes"]);
  } catch (e) {
    failedToast(e);
  } finally {
    isDeleting.value = false;
  }
};

const isEditing = ref(false);

const noteColor = computed(() => {
  return noteColors[props.note.id % noteColors.length];
});

const startEditing = () => {
  isEditing.value = true;
};

const handleReset = () => {
  resetForm();
  isEditing.value = false;
};
</script>

<template>
  <div
    :class="[
      'p-4 rounded-lg relative group transition-all duration-200',
      noteColor,
    ]"
  >
    <div class="flex items-start justify-between gap-2">
      <span v-if="!isEditing">{{ note.content }}</span>
      <input
        v-else
        v-model="content"
        v-bind="contentAttr"
        @keyup.enter="saveEditedNote"
        class="w-full bg-transparent outline-none"
      />
      <div class="flex items-center gap-2">
        <div v-if="!isEditing" class="flex gap-2 items-center">
          <Button @click="startEditing" class="p-1 hover:bg-white/20 rounded">
            <IconRepository icon-name="edit" />
          </Button>

          <Button
            :loading="isDeleting"
            @click="handleDelete"
            class="p-1 hover:bg-white/20 rounded"
          >
            <IconRepository icon-name="filled-delete" />
          </Button>
        </div>

        <Button
          @click="saveEditedNote"
          :loading="isSubmitting"
          class="p-1 hover:bg-white/20 rounded"
        >
          <IconRepository icon-name="save" />
        </Button>
        <Button @click="handleReset" class="p-1 hover:bg-white/20 rounded">
          <IconRepository icon-name="undo" />
        </Button>
      </div>
    </div>
    <div class="text-xs mt-2 opacity-70">
      {{ formatDate(note.created_at, "yyyy-LL-dd") }}
    </div>
  </div>
</template>
