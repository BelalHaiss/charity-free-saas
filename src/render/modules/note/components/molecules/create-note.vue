<script setup lang="ts">
import IconRepository from "@render/components/atoms/icon-repository.vue";
import { formatDate } from "@render/utils/date.util";
import { useForm } from "vee-validate";
import { CreateNotePayload } from "@shared/types/note/note.dto";
import Button from "primevue/button";
import { createNoteSchema } from "@shared/services/schema/note.schema";
import { toTypedSchema } from "@vee-validate/zod";
import { useI18n } from "vue-i18n";
import { Locale } from "@shared/types/util.types";
import { ref, watch } from "vue";
import { noteRepository } from "../../repository/note.repository";
import { useToast } from "@render/composables/use-toast";
import { useQueryHelper } from "@render/composables/use-query-typed";
import { useTypedI18n } from "@render/composables/use-typed-i18n";
import { useGlobalState } from "@render/composables/use-global-state";
import FormControl from "@render/components/molecules/form/form-control.vue";
const { locale } = useI18n<object, Locale>();
const { resetForm, defineField, meta, values, setFieldValue } =
  useForm<CreateNotePayload>({
    validationSchema: toTypedSchema(createNoteSchema(locale.value)),
  });

const { getters } = useGlobalState();
const { t } = useTypedI18n();
const { invalidateQueries } = useQueryHelper();
const { failedToast, successToast, invalidDataToast } = useToast();
const isPublic = ref(false);

watch(isPublic, (newIsPublicVal) =>
  setFieldValue(
    "branch_id",
    newIsPublicVal ? getters.getBranchId() : undefined,
    true,
  ),
);
const isSubmitting = ref(false);
const saveNote = async () => {
  if (!meta.value.valid) {
    invalidDataToast();
    return;
  }
  isSubmitting.value = true;
  const payload = values;
  try {
    await noteRepository.createNote(payload);
    successToast();
    await invalidateQueries(["notes"]);
    resetForm();
  } catch (e) {
    failedToast(e);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div
    :class="[
      'p-4 rounded-lg relative group transition-all duration-200 bg-yellow-100',
    ]"
  >
    <div class="flex flex-col gap-2">
      <FormControl
        hide-label
        type="textArea"
        label="content"
        name="content"
        :input-props="{
          class: 'input-transparent',
        }"
      />
    </div>
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-1">
        <Checkbox v-model="isPublic" binary inputId="is-public" />
        <label for="is-public"> {{ t("is_public") }} </label>
      </div>
      <div class="flex items-center">
        <Button
          :disabled="!meta.valid"
          v-tooltip="'save'"
          @click="saveNote"
          class="p-1 hover:bg-white/20 rounded"
          text
        >
          <IconRepository icon-name="save" />
        </Button>
        <Button
          text
          severity="secondary"
          v-tooltip="'reset'"
          @click="resetForm()"
          class="p-1 hover:bg-white/20 rounded"
        >
          <IconRepository icon-name="undo" />
        </Button>
      </div>
    </div>
  </div>
</template>
