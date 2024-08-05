<script setup lang="ts">
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
    label: t("shared.add", { label: t("shared.item") }),
    command: () => (activeModalRef.value = "item"),
  },
  {
    label: t("shared.add", { label: t("shared.donate") }),
    command: () => (activeModalRef.value = "donate"),
  },
  {
    label: t("shared.add", { label: t("shared.expense") }),
    command: () => (activeModalRef.value = "expense"),
  },
  {
    label: t("shared.add", { label: t("shared.note") }),
    command: () => (activeModalRef.value = "note"),
  },
]);
</script>
<template>
  <Button
    class="bg-primary-color absolute bottom-4 end-4 size-8"
    aria-haspopup="true"
    aria-controls="action_menu"
    @click="toggle"
  >
    <IonAddSharp class="text-white text-xl" />
  </Button>

  <Menu id="action_menu" ref="menu" :model="items" :popup="true" />
</template>
