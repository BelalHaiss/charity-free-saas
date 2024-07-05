<script setup lang="ts">
import { MenuItem } from "primevue/menuitem";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import langItem from "./lang-item.vue";
import { Locale } from "@render/config/i18n";
const { locale } = useI18n();

const items = ref<MenuItem[]>([
  {
    label: "ar",
    command: () => {
      locale.value = "ar";
    },
  },
  {
    label: "en",
    command: () => {
      locale.value = "en";
    },
  },
]);
const menu = ref();
const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div>
    <langItem
      class="border-2 border-green-400"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      :locale="locale as Locale"
      @click="toggle"
    />
    <Menu
      id="overlay_menu"
      ref="menu"
      class="min-w-20"
      :model="items"
      :popup="true"
    >
      <template #item="{ item }">
        <langItem
          class="w-full"
          :locale="item.label as Locale"
        />
      </template>
    </Menu>
  </div>
</template>
