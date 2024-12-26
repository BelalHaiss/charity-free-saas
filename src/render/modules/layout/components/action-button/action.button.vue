<script setup lang="ts">
import NoteTemplates from "@render/modules/note/components/templates/note.templates.vue";
import { useDraggable, useWindowSize } from "@vueuse/core";
import Menu from "primevue/menu";
import { MenuItem } from "primevue/menuitem";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import IonAddSharp from "~icons/ion/add-sharp";

const { t } = useI18n();

const activeComponent = {
  item: "item",
  donate: "donate",
  expense: "expense",
  note: "note",
};

const activeModalRef = ref<keyof typeof activeComponent>();
const actionBTN = ref<HTMLElement | null>(null);

const isVisible = ref(false);
const toggle = () => (isVisible.value = !isVisible.value);

const { height } = useWindowSize();
const { style } = useDraggable(actionBTN, {
  initialValue: { x: 100, y: height.value / 1.2 },
});
</script>
<template>
  <span
    :style="style"
    ref="actionBTN"
    class="flex-center absolute !bg-transparent cursor-pointer flex flex-col"
    aria-haspopup="true"
    aria-controls="action_menu"
  >
    <div class="" v-if="isVisible">
      <NoteTemplates />
    </div>

    <Button
      @click="toggle"
      class="flex-center shadow-xl p-1 size-10 rounded-full"
    >
      <IonAddSharp class="text-white text-xl" />
    </Button>
  </span>
</template>
