<script setup lang="ts">
import { ref, computed, watch } from "vue";
import IconRepository from "@render/components/atoms/icon-repository.vue";
import { Note } from "@prisma/client";
import { formatDate } from "@render/utils/date.util";
import { noteColors } from "../../service/note.util";
import { useForm } from "vee-validate";
import { updateNoteSchema } from "@shared/services/schema/note.schema";
import { toTypedSchema } from "@vee-validate/zod";
import { useI18n } from "vue-i18n";
import { Locale } from "@shared/types/util.types";
import {
  PrivateNote,
  PublicNote,
  UpdateNotePayload,
} from "@shared/types/note/note.dto";
import { useQueryHelper } from "@render/composables/use-query-typed";
import { useToast } from "@render/composables/use-toast";
import { noteRepository } from "../../repository/note.repository";
import Button from "primevue/button";
import { useGlobalState } from "@render/composables/use-global-state";
import UsernameWithIcon from "@render/components/molecules/username-with-icon.vue";
import { NoteItemType } from "../../types/note.types";
import { useTypedI18n } from "@render/composables/use-typed-i18n";

type NoteProps = {
  note: NoteItemType;
};

const { locale } = useI18n<object, Locale>();
const props = defineProps<NoteProps>();

const { resetForm, defineField, setFieldValue, values } =
  useForm<UpdateNotePayload>({
    validationSchema: toTypedSchema(updateNoteSchema(locale.value)),
    initialValues: {
      content: props.note.content,
    },
  });

const { t } = useTypedI18n();
const { getters } = useGlobalState();

const { invalidateQueries } = useQueryHelper();
const [content, contentAttr] = defineField("content");

const isPublic = ref(false);

watch(isPublic, (newIsPublicVal) =>
  setFieldValue("branch_id", getters.getBranchId(), true),
);
const { failedToast, successToast } = useToast();
const isSubmitting = ref(false);
const isDeleting = ref(false);
const isEditable = computed(
  () => props.note.user_id === getters.getCurrentUser()?.id,
);
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
    </div>
    <div class="text-xs mt-2 opacity-70 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <div v-if="isEditable" class="flex items-center gap-1">
          <Checkbox v-model="isPublic" inputId="is-public" />
          <label for="is-public"> {{ t("is_public") }} </label>
        </div>
        <UsernameWithIcon v-if="note.username" :username="note.username" />
        {{ formatDate(note.created_at, "yyyy-LL-dd") }}
      </div>
      <div v-if="isEditable" class="flex items-center gap-2">
        <div v-if="!isEditing" class="flex gap-2 items-center">
          <Button
            @click="startEditing"
            v-tooltip="'edit'"
            class="p-1 hover:bg-white/20 rounded"
          >
            <IconRepository icon-name="edit" />
          </Button>

          <Button
            :loading="isDeleting"
            @click="handleDelete"
            v-tooltip="'delete'"
            class="p-1 hover:bg-white/20 rounded"
          >
            <IconRepository icon-name="filled-delete" />
          </Button>
        </div>

        <div v-else>
          <Button
            @click="saveEditedNote"
            :loading="isSubmitting"
            class="p-1 hover:bg-white/20 rounded"
            v-tooltip="'save'"
          >
            <IconRepository icon-name="save" />
          </Button>
          <Button
            @click="handleReset"
            v-tooltip="'reset'"
            class="p-1 hover:bg-white/20 rounded"
          >
            <IconRepository icon-name="undo" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
