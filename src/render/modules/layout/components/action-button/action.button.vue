<script setup lang="ts">
import { useWindowSize } from "@render/composables/use-window-size";
import { useDraggable } from "@vueuse/core";
import Menu from "primevue/menu";
import { MenuItem } from "primevue/menuitem";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import IonAddSharp from "~icons/ion/add-sharp";
const menu = ref<Menu>();
const toggle = (e) => menu.value!.toggle(e);

const { t } = useI18n();

const activeComponent = {
  item: "item",
  donate: "donate",
  expense: "expense",
  note: "note",
};

const activeModalRef = ref<keyof typeof activeComponent>();
const items = ref<MenuItem[]>([
  {
    label: t("add", { label: t("item") }),
    command: () => (activeModalRef.value = "item"),
  },
  {
    label: t("add", { label: t("donate") }),
    command: () => (activeModalRef.value = "donate"),
  },
  {
    label: t("add", { label: t("expense") }),
    command: () => (activeModalRef.value = "expense"),
  },
  {
    label: t("add", { label: t("note") }),
    command: () => (activeModalRef.value = "note"),
  },
]);
const actionBTN = ref<HTMLElement | null>(null);

const { width, height } = useWindowSize();
const { style } = useDraggable(actionBTN, {
  initialValue: { x: width.value / 1.2, y: height.value / 1.2 },
  preventDefault: true,
});
</script>
<template>
  <div
    :style="style"
    ref="actionBTN"
    class="bg-primary-color p-2 flex-center fixed z-50"
    aria-haspopup="true"
    aria-controls="action_menu"
  >
    <IonAddSharp @click="toggle" class="text-white text-xl" />
  </div>

  <Menu id="action_menu" ref="menu" :model="items" :popup="true" />
</template>
