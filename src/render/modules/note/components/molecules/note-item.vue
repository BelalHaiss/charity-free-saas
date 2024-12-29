<script setup lang="ts">
import { ref, computed, watch } from "vue";
import IconRepository from "@render/components/atoms/icon-repository.vue";
import { formatDate } from "@render/utils/date.util";
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
import { useGlobalState } from "@render/composables/use-global-state";
import UsernameWithIcon from "@render/components/molecules/username-with-icon.vue";
import { NoteItemType } from "../../types/note.types";
import { useTypedI18n } from "@render/composables/use-typed-i18n";
import FormControl from "@render/components/molecules/form/form-control.vue";

type NoteProps = {
  note: NoteItemType;
};
const noteColors = [
  "bg-blue-100",
  "bg-purple-100",
  "bg-green-100",
  "bg-red-100",
  "bg-indigo-100",
];

const { locale } = useI18n<object, Locale>();
const props = defineProps<NoteProps>();
const isPublic = ref(!!props.note.branch_id);

const getInitialFormValue = () => {
  isPublic.value = !!props.note.branch_id;
  return {
    content: props.note.content,
    branch_id: props.note.branch_id ? props.note.branch_id : undefined,
  };
};

const { resetForm, meta, setFieldValue, values } = useForm<UpdateNotePayload>({
  validationSchema: toTypedSchema(updateNoteSchema(locale.value)),
  initialValues: getInitialFormValue(),
  keepValuesOnUnmount: true,
});

const { t } = useTypedI18n();
const { getters } = useGlobalState();

const { invalidateQueries } = useQueryHelper();

watch(isPublic, (newIsPublicVal) =>
  setFieldValue(
    "branch_id",
    newIsPublicVal ? getters.getBranchId() : undefined,
    true,
  ),
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
    handleReset();
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
  const randomIndex = Math.floor(Math.random() * noteColors.length);
  return noteColors[randomIndex];
});

const startEditing = () => {
  isEditing.value = true;
};

const handleReset = () => {
  resetForm({ values: getInitialFormValue() });
  isEditing.value = false;
};
</script>

<template>
  <div
    :class="[
      'p-3 rounded-lg flex flex-col  transition-all duration-200',
      noteColor,
    ]"
  >
    <div class="flex w-full">
      <span v-if="!isEditing">{{ note.content }}</span>
      <FormControl
        v-else
        hide-label
        type="textArea"
        label="content"
        name="content"
        :input-props="{
          class: 'input-transparent w-full',
        }"
      />
    </div>

    <div class="text-xs flex items-center my-2 gap-2">
      <UsernameWithIcon v-if="note.username" :username="note.username" />
      <span class="font-light">
        {{ formatDate(note.created_at, "yyyy-LL-dd") }}
      </span>
    </div>
    <div
      v-if="isEditable"
      class="text-xs opacity-70 flex justify-between items-center"
    >
      <div v-if="isEditing" class="flex items-center gap-1">
        <Checkbox
          class="!text-xs"
          binary
          v-model="isPublic"
          :inputId="note.id + 'is-public'"
        />
        <label :for="note.id + 'is-public'"> {{ t("is_public") }} </label>
      </div>
      <div class="flex items-center gap-2 ms-auto">
        <div v-if="!isEditing" class="flex items-center">
          <Button
            @click="startEditing"
            severity="warning"
            v-tooltip="t('edit')"
            class="p-1"
            text
          >
            <IconRepository icon-name="edit" />
          </Button>

          <Button
            :loading="isDeleting"
            @click="handleDelete"
            v-tooltip="t('delete')"
            class="p-1"
            severity="danger"
            text
          >
            <IconRepository icon-name="filled-delete" />
          </Button>
        </div>

        <div v-else>
          <Button
            @click="saveEditedNote"
            :loading="isSubmitting"
            :disabled="!meta.touched || !meta.valid"
            class="p-1"
            v-tooltip="t('save')"
            text
          >
            <IconRepository icon-name="save" />
          </Button>
          <Button
            severity="secondary"
            @click="handleReset"
            v-tooltip="t('reset')"
            class="p-1"
            text
          >
            <IconRepository icon-name="undo" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
