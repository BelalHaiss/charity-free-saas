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
import { ref } from "vue";
import { noteRepository } from "../../repository/note.repository";
import { useToast } from "@render/composables/use-toast";
import { useQueryHelper } from "@render/composables/use-query-typed";
const { locale } = useI18n<object, Locale>();
const { resetForm, defineField, meta, values } = useForm<CreateNotePayload>({
  validationSchema: toTypedSchema(createNoteSchema(locale.value)),
});

const { invalidateQueries } = useQueryHelper();
const [content, contentAttr] = defineField("content");
const { failedToast, successToast } = useToast();
const isSubmitting = ref(false);
const saveNote = async () => {
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
  <form
    :class="[
      'p-4 rounded-lg relative group transition-all duration-200 bg-yellow-100',
    ]"
  >
    <div class="flex items-start justify-between gap-2">
      <input
        v-model="content"
        v-bind="contentAttr"
        @keyup.enter="saveNote"
        class="w-full bg-transparent outline-none"
      />
      <div class="flex items-center gap-2">
        <Button
          :disabled="meta.valid"
          @click="saveNote"
          class="p-1 hover:bg-white/20 rounded"
        >
          <IconRepository icon-name="save" />
        </Button>
        <Button @click="resetForm()" class="p-1 hover:bg-white/20 rounded">
          <IconRepository icon-name="undo" />
        </Button>
      </div>
    </div>
    <div class="text-xs mt-2 opacity-70">
      {{ formatDate(new Date(), "yyyy-LL-dd") }}
    </div>
  </form>
</template>
