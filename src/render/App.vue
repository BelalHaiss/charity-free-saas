<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { usePrimeVue } from "primevue/config";
import { getPrimeLocale } from "./locales/locale.util";
// import { useGlobalState } from './composables/use-global-state';
import { useRoute } from "vue-router/auto";
import SideNav from "./modules/layout/components/side-nav.vue";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { useInitialCacheHandler } from "./composables/use-initial-cache";
import SpinnerFullPage from "./components/molecules/spinner-full-page.vue";
import { Settings } from "luxon";
import { useGlobalState } from "./composables/use-global-state";
import { Locale } from "@shared/types/util.types";
import { useInitialRouteHandling } from "./composables/use-initial-route-handling";

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

const setRouteHandled = () => (isFirstRouteHandled.value = true);
useInitialRouteHandling(setRouteHandled);
useInitialCacheHandler(setCachedFetchedDone);

watchEffect(() => {
  document.documentElement.lang = locale.value;
  document.documentElement.dir = locale.value === "ar" ? "rtl" : "ltr";
  primevue.config.locale = getPrimeLocale(locale.value);
  Settings.defaultLocale = locale.value;
});

const isSetupPage = computed(
  () => route.fullPath === "/setup" || route.fullPath === "/login",
);
</script>

<template>
  <SpinnerFullPage v-if="!isInitializing" />

  <SideNav v-if="!isSetupPage" />

  <Toast />
  <main
    v-if="isInitializing"
    class="w-full h-full p-1 flex-1"
    :class="!isSetupPage ? 'page-container ms-[85px] ' : ''"
  >
    <RouterView />
  </main>
  <VueQueryDevtools />
</template>

<style>
@import "./assets/css/global.css";
@import "primevue/resources/themes/aura-light-green/theme.css";
</style>
