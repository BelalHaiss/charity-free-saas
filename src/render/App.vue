<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { usePrimeVue } from "primevue/config";
import { getPrimeLocaleOption } from "./locales/locale.util";
// import { useGlobalState } from './composables/use-global-state';
import { useRoute } from "vue-router/auto";
import SideNav from "./modules/layout/components/side-nav.vue";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { Locale } from "./config/i18n";
import { useInitialCacheHandler } from "./composables/use-initial-cache";

const { locale } = useI18n<object, Locale>();
const primevue = usePrimeVue();
const isFirstRouteHandled = ref(false);
// const { storage } = useGlobalState();
const route = useRoute();
const isCachedDataFetched = ref(false);

const setCachedFetchedDone = () => (isCachedDataFetched.value = true);
const isInitializing = computed(
  () => isCachedDataFetched.value && isFirstRouteHandled.value,
);
useInitialCacheHandler(setCachedFetchedDone);
onMounted(() => {
  // const { organization } = storage.value;
  isFirstRouteHandled.value = true;
  // if (!organization) router.push('/setup');
});
watchEffect(() => {
  document.documentElement.lang = locale.value;
  document.documentElement.dir = locale.value === "ar" ? "rtl" : "ltr";
  if (primevue.config.locale) {
    primevue.config.locale.dayNamesMin = getPrimeLocaleOption(
      locale.value,
      "dayNamesMin",
    );
    primevue.config.locale.monthNamesShort = getPrimeLocaleOption(
      locale.value,
      "monthNamesShort",
    );
    primevue.config.locale.monthNames = getPrimeLocaleOption(
      locale.value,
      "monthNames",
    );
  }
});

const isSetupPage = computed(() => route.fullPath === "/setup");
</script>

<template>
  <div
    v-if="!isInitializing"
    class="flex-center w-dvw h-dvh"
  >
    <ProgressSpinner />
  </div>

  <SideNav v-if="!isSetupPage" />

  <Toast />
  <main
    v-if="isInitializing"
    class="w-full h-full p-1 flex-1"
    :class="!isSetupPage ? 'page-container ms-[85px]' : ''"
  >
    <RouterView />
  </main>
  <VueQueryDevtools />
</template>

<style>
@import "./assets/css/global.css";
@import "primevue/resources/themes/aura-light-green/theme.css";
</style>
