<script setup lang="ts">
import NoteTemplates from "@render/modules/note/components/templates/note.templates.vue";
import { onClickOutside, useDraggable, useWindowSize } from "@vueuse/core";
import Menu from "primevue/menu";
import { MenuItem } from "primevue/menuitem";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import IonAddSharp from "~icons/ion/add-sharp";

const { t } = useI18n();

const actionBTN = ref<HTMLElement | null>(null);

const isVisible = ref(false);
const toggle = () => (isVisible.value = !isVisible.value);
const wrapperTarget = ref<HTMLElement>();

onClickOutside(wrapperTarget, () => {
  if (isVisible.value) {
    isVisible.value = false;
  }
});

const { height } = useWindowSize();
const { style, position } = useDraggable(actionBTN, {
  initialValue: { x: 100, y: height.value / 1.2 },
});

const menuStyle = computed(() => ({
  top: `${position.value.y}px`,
  left: `${position.value.x}px`,
  transform: "translateY(-120%)", // Adjust to move menu above the button
}));
</script>
<template>
  <div ref="wrapperTarget" class="relative">
    <!-- Menu -->
    <div
      :style="[menuStyle, { position: 'absolute', zIndex: 10 }]"
      :class="[
        'flex flex-col gap-2 transition-all duration-300 transform',
        isVisible
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none',
      ]"
    >
      <NoteTemplates />
    </div>

    <!-- Draggable Button -->
    <div
      :style="style"
      ref="actionBTN"
      class="flex-center !bg-transparent absolute cursor-pointer"
    >
      <Button
        @click="toggle"
        class="flex-center shadow-xl p-1 size-10 rounded-full"
      >
        <IonAddSharp class="text-white text-xl" />
      </Button>
    </div>
  </div>
</template>
